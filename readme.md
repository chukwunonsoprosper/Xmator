# Xmator – Intelligent Auto-Unfollow Script for X (Twitter)

Xmator is a powerful automation script designed to help you efficiently manage your following list on X (formerly Twitter). Unlike traditional mass-unfollow tools, Xmator intelligently filters accounts based on their bios, ensuring that you do not unfollow tech-related accounts. The script automates the unfollowing process while maintaining a relevant and valuable network.

## Features

- **Smart Filtering**: Before unfollowing, Xmator checks user bios for tech-related keywords (e.g., "tech," "developer," "AI," "coding," "startup"). If a match is found, the user is skipped.
- **Automated Unfollowing**: Clicks the unfollow button, handles confirmation popups, and confirms the action automatically.
- **Auto-Scrolling**: If no more unfollow buttons are available, Xmator scrolls down to load additional accounts.
- **Human-Like Behavior**: Includes randomized delays to mimic user activity and reduce the risk of detection.
- **Continuous Execution**: The script runs automatically until all eligible accounts have been unfollowed.

## Installation & Usage

1. Open X (Twitter) and navigate to your Following list.
2. Open the browser’s Developer Console:
    - **Chrome (Windows/Linux)**: Press `Ctrl + Shift + J`
    - **Firefox (Windows/Linux)**: Press `Ctrl + Shift + K`
    - **Mac (Chrome/Firefox)**: Press `Cmd + Option + J` or `Cmd + Option + K`
3. Copy and paste the Xmator script into the console, then press `Enter`.
4. The script will automatically start processing your following list.

## Configuration

You can modify the script’s filtering keywords by updating the `allowKeywords` array. This allows customization based on your preferences.

```javascript
const allowKeywords = ["tech", "developer", "coding", "AI", "startup", "software", "innovation"];
```

## Important Considerations

- **Use responsibly**: X (Twitter) has rate limits on unfollowing. Excessive use may result in temporary restrictions.
- **Stopping the script**: To halt execution, refresh the page or close the browser tab.

## License

This project is open-source and available under the MIT License. Contributions and improvements are welcome.