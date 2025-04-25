#!/bin/bash

# Array of random phrases (stdout)
phrases=(
    "Hello there! (stdout)"
    "Script is running... (stdout)"
    "Random number: $RANDOM (stdout)"
    "Current time: $(date) (stdout)"
)

# Array of error messages (stderr)
errors=(
    "Warning: Low disk space! (stderr)"
    "Error: Something went wrong! (stderr)"
    "Alert: High CPU usage! (stderr)"
)

# Runtime (5 seconds)
start_time=$(date +%s)
end_time=$((start_time + 5))
current_time=$start_time

while [[ $current_time -lt $end_time ]]; do
    # Randomly choose between stdout and stderr
    if (( RANDOM % 3 == 0 )); then  # ~33% chance of stderr
        random_error_index=$((RANDOM % ${#errors[@]}))
        eval "echo \"${errors[$random_error_index]}\""  # Force stderr
    else
        random_phrase_index=$((RANDOM % ${#phrases[@]}))
        echo "${phrases[$random_phrase_index]}"  # Normal stdout
    fi

    # Short sleep (0.1-0.5s)
    sleep_time=$(awk "BEGIN {print $((RANDOM % 5 + 1)) / 10}")
    sleep $sleep_time

    current_time=$(date +%s)
done

echo "Script completed! (stdout)"
echo "Final error test (stderr)" >&2  # One last stderr before exit
exit 0  # Explicit OK exit code