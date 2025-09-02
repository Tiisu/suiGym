module suigym::wellness {
    use std::option::Option;
    use std::string::{Self, String};
    use std::vector;
    use sui::object::UID;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::clock::{Self, Clock};
    use sui::transfer;
    use sui::url::{Self, Url};
    use sui::display;
    use sui::package;

    /// Errors
    const EALREADY_LOGGED_TODAY: u64 = 1;
    const EINVALID_WEIGHT: u64 = 2;
    const ENOT_OWNER: u64 = 5;

    /// Achievement rarity levels
    const RARITY_COMMON: u8 = 1;
    const RARITY_RARE: u8 = 2;
    const RARITY_EPIC: u8 = 3;
    const RARITY_LEGENDARY: u8 = 4;
    const RARITY_MYTHIC: u8 = 5;

    /// Enhanced Profile resource with achievement tracking
    public struct Profile has key, store {
        id: UID,
        owner: address,
        username: String,
        streak: u64,
        total_logs: u64,
        last_log_day: Option<u64>, // stores day number
        achievements_earned: vector<String>,
        total_nfts: u64,
        current_weight: Option<u64>, // weight in grams
        starting_weight: Option<u64>, // weight in grams
        weight_lost: u64, // total weight lost in grams
        longest_streak: u64,
        profile_created_day: u64,
        workout_history: vector<WorkoutEntry>, // detailed workout history
    }

    /// Individual workout entry with exercise details
    public struct WorkoutEntry has store, copy, drop {
        date: u64, // timestamp
        exercises: vector<Exercise>,
        total_duration_minutes: u64,
        notes: String,
    }

    /// Individual exercise within a workout
    public struct Exercise has store, copy, drop {
        exercise_type: String, // "push_ups", "squats", "running", etc.
        reps_or_duration: u64, // reps for strength, minutes for cardio
        sets: u64, // number of sets
        weight_kg: Option<u64>, // weight used (for weighted exercises)
        distance_km: Option<u64>, // distance (for cardio, stored as meters)
    }

    /// NFT Achievement struct
    public struct AchievementNFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: Url,
        achievement_type: String, // "streak", "milestone", "weight_loss", "special"
        rarity: u8,
        earned_date: u64,
        user_stats_snapshot: UserStatsSnapshot,
    }

    /// Snapshot of user stats when achievement was earned
    public struct UserStatsSnapshot has store {
        total_workouts: u64,
        current_streak: u64,
        weight_lost: u64,
        days_since_start: u64,
    }

    /// One-Time-Witness for creating display
    public struct WELLNESS has drop {}

    /// Event emitted when a workout is logged
    public struct WorkoutLoggedEvent has copy, drop {
        owner: address,
        day: u64,
        streak: u64,
        total_logs: u64,
        weight_lost: u64,
        workout_summary: String, // summary of exercises performed
        duration_minutes: u64,
    }

    /// Event emitted when an achievement NFT is earned
    public struct AchievementEarnedEvent has copy, drop {
        owner: address,
        achievement_name: String,
        achievement_type: String,
        rarity: u8,
        earned_date: u64,
        total_nfts: u64,
    }

    /// Initialize the module and create display for NFTs
    fun init(otw: WELLNESS, ctx: &mut TxContext) {
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"achievement_type"),
            string::utf8(b"rarity"),
            string::utf8(b"earned_date"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{image_url}"),
            string::utf8(b"{achievement_type}"),
            string::utf8(b"{rarity}"),
            string::utf8(b"{earned_date}"),
        ];

        let publisher = package::claim(otw, ctx);
        let mut display = display::new_with_fields<AchievementNFT>(
            &publisher, keys, values, ctx
        );
        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    /// Create a new profile for the sender
    entry fun create_profile(username: String, starting_weight_kg: Option<u64>, clock: &Clock, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let now_ms = clock::timestamp_ms(clock);
        let today = now_ms / 86400000;

        // Convert kg to grams if provided
        let starting_weight_grams = if (option::is_some(&starting_weight_kg)) {
            let weight_kg = *option::borrow(&starting_weight_kg);
            option::some(weight_kg * 1000)
        } else {
            option::none<u64>()
        };

        let profile = Profile {
            id: object::new(ctx),
            owner: sender,
            username,
            streak: 0,
            total_logs: 0,
            last_log_day: option::none<u64>(),
            achievements_earned: vector::empty<String>(),
            total_nfts: 0,
            current_weight: starting_weight_grams,
            starting_weight: starting_weight_grams,
            weight_lost: 0,
            longest_streak: 0,
            profile_created_day: today,
            workout_history: vector::empty<WorkoutEntry>(),
        };

        transfer::transfer(profile, sender);
    }

    /// Update current weight (in kg)
    entry fun update_weight(profile: &mut Profile, new_weight_kg: u64, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(profile.owner == sender, ENOT_OWNER);
        assert!(new_weight_kg > 0 && new_weight_kg < 1000, EINVALID_WEIGHT); // Reasonable weight range

        let new_weight_grams = new_weight_kg * 1000;
        profile.current_weight = option::some(new_weight_grams);

        // Calculate weight lost if we have a starting weight
        if (option::is_some(&profile.starting_weight)) {
            let starting_weight = *option::borrow(&profile.starting_weight);
            if (new_weight_grams < starting_weight) {
                profile.weight_lost = starting_weight - new_weight_grams;
            };
        };
    }

    /// Log a detailed workout with exercises
    entry fun log_workout_detailed(
        profile: &mut Profile, 
        exercise_types: vector<String>,
        reps_or_durations: vector<u64>,
        sets: vector<u64>,
        weights_kg: vector<Option<u64>>,
        distances_m: vector<Option<u64>>,
        duration_minutes: u64,
        notes: String,
        clock: &Clock, 
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Check ownership
        assert!(profile.owner == sender, ENOT_OWNER);

        // Current day number (convert ms → days)
        let now_ms = clock::timestamp_ms(clock);
        let today = now_ms / 86400000;

        // Ensure not already logged today
        if (option::is_some(&profile.last_log_day)) {
            let last_day = *option::borrow(&profile.last_log_day);
            assert!(last_day < today, EALREADY_LOGGED_TODAY);
        };

        // Create exercises vector
        let mut exercises = vector::empty<Exercise>();
        let mut i = 0;
        let len = vector::length(&exercise_types);
        
        while (i < len) {
            let exercise = Exercise {
                exercise_type: *vector::borrow(&exercise_types, i),
                reps_or_duration: *vector::borrow(&reps_or_durations, i),
                sets: *vector::borrow(&sets, i),
                weight_kg: *vector::borrow(&weights_kg, i),
                distance_km: *vector::borrow(&distances_m, i),
            };
            vector::push_back(&mut exercises, exercise);
            i = i + 1;
        };

        // Create workout entry
        let workout_entry = WorkoutEntry {
            date: now_ms,
            exercises,
            total_duration_minutes: duration_minutes,
            notes,
        };

        // Add to workout history
        vector::push_back(&mut profile.workout_history, workout_entry);

        // Update streak
        let new_streak = if (option::is_some(&profile.last_log_day)) {
            let last_day = *option::borrow(&profile.last_log_day);
            if (today == last_day + 1) {
                profile.streak + 1
            } else {
                1 // Reset streak but start new one
            }
        } else {
            1
        };

        profile.streak = new_streak;
        profile.total_logs = profile.total_logs + 1;
        profile.last_log_day = option::some(today);

        // Update longest streak
        if (new_streak > profile.longest_streak) {
            profile.longest_streak = new_streak;
        };

        // Create workout summary
        let workout_summary = create_workout_summary(&exercise_types);

        // Emit event
        event::emit(WorkoutLoggedEvent {
            owner: sender,
            day: today,
            streak: new_streak,
            total_logs: profile.total_logs,
            weight_lost: profile.weight_lost,
            workout_summary,
            duration_minutes,
        });

        // Check for achievements after logging workout
        check_and_mint_achievements(profile, clock, ctx);
    }

    /// Simple workout logging (for backward compatibility)
    entry fun log_workout(profile: &mut Profile, clock: &Clock, ctx: &mut TxContext) {
        // Create a simple "General Workout" entry
        let exercise_types = vector[string::utf8(b"General Workout")];
        let reps_or_durations = vector[1u64];
        let sets = vector[1u64];
        let weights_kg = vector[option::none<u64>()];
        let distances_m = vector[option::none<u64>()];
        
        log_workout_detailed(
            profile,
            exercise_types,
            reps_or_durations,
            sets,
            weights_kg,
            distances_m,
            30, // default 30 minutes
            string::utf8(b""),
            clock,
            ctx
        );
    }

    /// Create a summary string from exercise types
    fun create_workout_summary(exercise_types: &vector<String>): String {
        if (vector::length(exercise_types) == 0) {
            return string::utf8(b"Workout completed")
        };
        
        if (vector::length(exercise_types) == 1) {
            return *vector::borrow(exercise_types, 0)
        };
        
        // For multiple exercises, create a summary
        let len = vector::length(exercise_types);
        if (len == 2) {
            string::utf8(b"Mixed workout")
        } else {
            string::utf8(b"Full body workout")
        }
    }

    /// Check for new achievements and mint NFTs
    fun check_and_mint_achievements(profile: &mut Profile, clock: &Clock, ctx: &mut TxContext) {
        let now_ms = clock::timestamp_ms(clock);

        // Check streak achievements
        check_streak_achievements(profile, now_ms, ctx);
        
        // Check milestone achievements
        check_milestone_achievements(profile, now_ms, ctx);
        
        // Check weight loss achievements
        check_weight_loss_achievements(profile, now_ms, ctx);
        
        // Check special achievements
        check_special_achievements(profile, now_ms, ctx);
    }

    /// Check and mint streak-based achievements
    fun check_streak_achievements(profile: &mut Profile, timestamp: u64, ctx: &mut TxContext) {
        let streak = profile.streak;
        
        if (streak == 3 && !has_achievement(profile, b"First Flame")) {
            mint_achievement_nft(profile, b"First Flame", b"Completed 3 consecutive workout days", 
                               b"streak", RARITY_COMMON, timestamp, ctx);
        } else if (streak == 7 && !has_achievement(profile, b"Week Warrior")) {
            mint_achievement_nft(profile, b"Week Warrior", b"Completed 7 consecutive workout days", 
                               b"streak", RARITY_COMMON, timestamp, ctx);
        } else if (streak == 14 && !has_achievement(profile, b"Fortnight Fighter")) {
            mint_achievement_nft(profile, b"Fortnight Fighter", b"Completed 14 consecutive workout days", 
                               b"streak", RARITY_RARE, timestamp, ctx);
        } else if (streak == 30 && !has_achievement(profile, b"Month Master")) {
            mint_achievement_nft(profile, b"Month Master", b"Completed 30 consecutive workout days", 
                               b"streak", RARITY_RARE, timestamp, ctx);
        } else if (streak == 90 && !has_achievement(profile, b"Quarter Champion")) {
            mint_achievement_nft(profile, b"Quarter Champion", b"Completed 90 consecutive workout days", 
                               b"streak", RARITY_EPIC, timestamp, ctx);
        } else if (streak == 365 && !has_achievement(profile, b"Year Legend")) {
            mint_achievement_nft(profile, b"Year Legend", b"Completed 365 consecutive workout days", 
                               b"streak", RARITY_LEGENDARY, timestamp, ctx);
        } else if (streak == 500 && !has_achievement(profile, b"Unstoppable Force")) {
            mint_achievement_nft(profile, b"Unstoppable Force", b"Completed 500 consecutive workout days", 
                               b"streak", RARITY_MYTHIC, timestamp, ctx);
        };
    }

    /// Check and mint milestone-based achievements
    fun check_milestone_achievements(profile: &mut Profile, timestamp: u64, ctx: &mut TxContext) {
        let total_logs = profile.total_logs;
        
        if (total_logs == 1 && !has_achievement(profile, b"First Steps")) {
            mint_achievement_nft(profile, b"First Steps", b"Logged your very first workout", 
                               b"milestone", RARITY_COMMON, timestamp, ctx);
        } else if (total_logs == 10 && !has_achievement(profile, b"Getting Started")) {
            mint_achievement_nft(profile, b"Getting Started", b"Completed 10 total workouts", 
                               b"milestone", RARITY_COMMON, timestamp, ctx);
        } else if (total_logs == 50 && !has_achievement(profile, b"Gym Regular")) {
            mint_achievement_nft(profile, b"Gym Regular", b"Completed 50 total workouts", 
                               b"milestone", RARITY_RARE, timestamp, ctx);
        } else if (total_logs == 100 && !has_achievement(profile, b"Fitness Fanatic")) {
            mint_achievement_nft(profile, b"Fitness Fanatic", b"Completed 100 total workouts", 
                               b"milestone", RARITY_EPIC, timestamp, ctx);
        } else if (total_logs == 250 && !has_achievement(profile, b"Iron Will")) {
            mint_achievement_nft(profile, b"Iron Will", b"Completed 250 total workouts", 
                               b"milestone", RARITY_LEGENDARY, timestamp, ctx);
        } else if (total_logs == 500 && !has_achievement(profile, b"Legendary Lifter")) {
            mint_achievement_nft(profile, b"Legendary Lifter", b"Completed 500 total workouts", 
                               b"milestone", RARITY_MYTHIC, timestamp, ctx);
        };
    }

    /// Check and mint weight loss achievements
    fun check_weight_loss_achievements(profile: &mut Profile, timestamp: u64, ctx: &mut TxContext) {
        let weight_lost_kg = profile.weight_lost / 1000; // Convert grams to kg
        
        if (weight_lost_kg >= 1 && !has_achievement(profile, b"First Victory")) {
            mint_achievement_nft(profile, b"First Victory", b"Lost your first kilogram", 
                               b"weight_loss", RARITY_COMMON, timestamp, ctx);
        } else if (weight_lost_kg >= 3 && !has_achievement(profile, b"Making Progress")) {
            mint_achievement_nft(profile, b"Making Progress", b"Lost 3 kilograms", 
                               b"weight_loss", RARITY_RARE, timestamp, ctx);
        } else if (weight_lost_kg >= 5 && !has_achievement(profile, b"Halfway Hero")) {
            mint_achievement_nft(profile, b"Halfway Hero", b"Lost 5 kilograms", 
                               b"weight_loss", RARITY_EPIC, timestamp, ctx);
        } else if (weight_lost_kg >= 10 && !has_achievement(profile, b"Major Milestone")) {
            mint_achievement_nft(profile, b"Major Milestone", b"Lost 10 kilograms", 
                               b"weight_loss", RARITY_LEGENDARY, timestamp, ctx);
        } else if (weight_lost_kg >= 15 && !has_achievement(profile, b"Transformation Complete")) {
            mint_achievement_nft(profile, b"Transformation Complete", b"Lost 15+ kilograms", 
                               b"weight_loss", RARITY_MYTHIC, timestamp, ctx);
        };
    }

    /// Check and mint special achievements
    fun check_special_achievements(profile: &mut Profile, timestamp: u64, ctx: &mut TxContext) {
        // Comeback Kid: Return after 30+ day break (check if last workout was >30 days ago but now has 1+ streak)
        if (profile.streak >= 1 && option::is_some(&profile.last_log_day) && !has_achievement(profile, b"Comeback Kid")) {
            let today = timestamp / 86400000;
            let last_day = *option::borrow(&profile.last_log_day);
            if (today > last_day + 30 && profile.total_logs > 1) {
                mint_achievement_nft(profile, b"Comeback Kid", b"Returned to fitness after 30+ day break", 
                                   b"special", RARITY_RARE, timestamp, ctx);
            };
        };
    }

    /// Mint an achievement NFT
    fun mint_achievement_nft(
        profile: &mut Profile, 
        name: vector<u8>, 
        description: vector<u8>,
        achievement_type: vector<u8>,
        rarity: u8,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        let achievement_name = string::utf8(name);
        
        // Create user stats snapshot
        let stats_snapshot = UserStatsSnapshot {
            total_workouts: profile.total_logs,
            current_streak: profile.streak,
            weight_lost: profile.weight_lost,
            days_since_start: (timestamp / 86400000) - profile.profile_created_day,
        };

        // Create image URL based on achievement name (placeholder for now)
        let image_url = url::new_unsafe_from_bytes(b"https://suigym.com/nft/placeholder.png");

        let nft = AchievementNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            image_url,
            achievement_type: string::utf8(achievement_type),
            rarity,
            earned_date: timestamp,
            user_stats_snapshot: stats_snapshot,
        };

        // Add to profile's achievement list
        vector::push_back(&mut profile.achievements_earned, achievement_name);
        profile.total_nfts = profile.total_nfts + 1;

        // Emit achievement event
        event::emit(AchievementEarnedEvent {
            owner: profile.owner,
            achievement_name: string::utf8(name),
            achievement_type: string::utf8(achievement_type),
            rarity,
            earned_date: timestamp,
            total_nfts: profile.total_nfts,
        });

        // Transfer NFT to user
        transfer::transfer(nft, profile.owner);
    }

    /// Check if user has already earned a specific achievement
    fun has_achievement(profile: &Profile, achievement_name: vector<u8>): bool {
        let achievement_string = string::utf8(achievement_name);
        vector::contains(&profile.achievements_earned, &achievement_string)
    }

    /// View enhanced profile data
    public fun get_profile_data(profile: &Profile): (String, u64, u64, Option<u64>, u64, u64, Option<u64>, u64, Option<u64>) {
        (
            profile.username, 
            profile.streak, 
            profile.total_logs, 
            profile.last_log_day,
            profile.total_nfts,
            profile.weight_lost / 1000, // Return weight in kg
            if (option::is_some(&profile.current_weight)) {
                option::some(*option::borrow(&profile.current_weight) / 1000)
            } else {
                option::none<u64>()
            },
            profile.longest_streak,
            if (option::is_some(&profile.starting_weight)) {
                option::some(*option::borrow(&profile.starting_weight) / 1000)
            } else {
                option::none<u64>()
            }
        )
    }

    /// Get user's earned achievements
    public fun get_achievements(profile: &Profile): vector<String> {
        profile.achievements_earned
    }

    /// Get achievement count by rarity
    public fun get_achievement_stats(profile: &Profile): (u64, u64) {
        (profile.total_nfts, vector::length(&profile.achievements_earned))
    }

    /// Get recent workout history (last N workouts)
    public fun get_recent_workouts(profile: &Profile, count: u64): vector<WorkoutEntry> {
        let history_len = vector::length(&profile.workout_history);
        let mut result = vector::empty<WorkoutEntry>();
        
        if (history_len == 0) {
            return result
        };
        
        let start_idx = if (history_len > count) {
            history_len - count
        } else {
            0
        };
        
        let mut i = start_idx;
        while (i < history_len) {
            let workout = *vector::borrow(&profile.workout_history, i);
            vector::push_back(&mut result, workout);
            i = i + 1;
        };
        
        result
    }

    /// Get workout statistics
    public fun get_workout_stats(profile: &Profile): (u64, u64, u64) {
        let total_workouts = vector::length(&profile.workout_history);
        let mut total_duration = 0u64;
        let mut total_exercises = 0u64;
        
        let mut i = 0;
        while (i < total_workouts) {
            let workout = vector::borrow(&profile.workout_history, i);
            total_duration = total_duration + workout.total_duration_minutes;
            total_exercises = total_exercises + vector::length(&workout.exercises);
            i = i + 1;
        };
        
        (total_workouts, total_duration, total_exercises)
    }

    /// Get exercise breakdown (count of each exercise type)
    public fun get_exercise_breakdown(profile: &Profile): vector<String> {
        let mut exercise_types = vector::empty<String>();
        let history_len = vector::length(&profile.workout_history);
        
        let mut i = 0;
        while (i < history_len) {
            let workout = vector::borrow(&profile.workout_history, i);
            let exercises_len = vector::length(&workout.exercises);
            
            let mut j = 0;
            while (j < exercises_len) {
                let exercise = vector::borrow(&workout.exercises, j);
                if (!vector::contains(&exercise_types, &exercise.exercise_type)) {
                    vector::push_back(&mut exercise_types, exercise.exercise_type);
                };
                j = j + 1;
            };
            i = i + 1;
        };
        
        exercise_types
    }
}