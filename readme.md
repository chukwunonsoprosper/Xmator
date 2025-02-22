# Xmator – Twitter Auto Follow/Unfollow Extension

🚀 Xmator is a powerful Chrome extension that automates following and unfollowing Twitter users based on specific keywords in their bio.

⚠ **Warning**
This extension interacts with Twitter's interface; use it responsibly. Excessive automated actions may result in temporary restrictions on your account. Ensure compliance with Twitter’s terms of service to avoid penalties.

## Features

✅ Follow users whose bio contains specific keywords  
✅ Unfollow users who don’t match your criteria  
✅ Works automatically while scrolling  
✅ Customizable keyword filtering

## Installation

1. Download or clone this repository.
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