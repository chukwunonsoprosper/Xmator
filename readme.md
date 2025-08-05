# Xmator

Smart Twitter automation tool that automatically follows/unfollows accounts based on bio keywords.

[![Version](https://img.shields.io/badge/version-2.0-blue.svg)](https://github.com/chukwunonsoprosper/Xmator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

- Analyzes user bios and matches keywords
- Two modes: Follow new accounts or unfollow existing ones
- Bulk processing (no keywords required)
- Safe operation with built-in delays
- Works on both twitter.com and x.com

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked" and select the Xmator folder
5. The extension is now installed

## How It Works

| Mode | Action | With Keywords | Without Keywords |
|------|--------|---------------|------------------|
| **Unfollow** | Analyzes following list | Keeps matching bios | Unfollows all accounts |
| **Follow** | Analyzes suggested accounts | Follows matching bios | Follows all accounts |

## How to Use

1. Go to Twitter/X in your browser
2. Navigate to a Following page:
   - For **Unfollow mode**: Go to your own Following page
   - For **Follow mode**: Go to someone else's Following page
3. Click the Xmator extension icon
4. Enter keywords (optional):
   - With keywords: Only processes accounts matching those keywords
   - Without keywords: Processes all accounts (bulk mode)
5. Choose your mode:
   - **Unfollow**: Keeps accounts with your keywords, removes others
   - **Follow**: Follows accounts with your keywords, skips others
6. Click "Start Xmator"
7. Check browser console (F12) to monitor progress

## Examples

**Clean your following list:**
- Mode: Unfollow
- Keywords: `developer, tech, startup`
- Result: Keeps tech-related accounts, unfollows others

**Follow tech people:**
- Mode: Follow
- Keywords: `engineer, programming, code`
- Result: Follows only accounts with those keywords

**Unfollow everyone:**
- Mode: Unfollow
- Keywords: (leave empty)
- Result: Unfollows all accounts

## Troubleshooting

- **No buttons found**: Scroll down to load more profiles
- **Extension not working**: Make sure you're on twitter.com or x.com
- **Keywords not matching**: Check spelling and use lowercase
- **See what's happening**: Press F12 to open console for detailed logs

## Contributing

1. Fork this repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Disclaimer

Use responsibly and follow Twitter's Terms of Service.

## Usage Guide

### Step-by-Step Instructions

| Step | Action | Details |
|------|--------|---------|
| **1** | **Navigate** | Open `twitter.com` or `x.com` |
| **2** | **Choose Page** | Following page (unfollow) or target user's following (follow) |
| **3** | **Open Extension** | Click Xmator icon in browser toolbar |
| **4** | **Set Keywords** | Enter keywords or leave empty for bulk processing |
| **5** | **Select Mode** | Choose Follow or Unfollow mode |
| **6** | **Start** | Click "Start Xmator" button |
| **7** | **Monitor** | Check browser console (F12) for real-time progress |

## Use Cases

**Clean Your Following List**

**Goal**: Remove accounts that don't match your interests
- **Mode**: Unfollow
- **Keywords**: `"developer, tech, startup, AI"`
- **Result**: Keeps tech-related accounts, removes others

**Build Targeted Network**

**Goal**: Follow accounts in your field
- **Mode**: Follow  
- **Keywords**: `"software engineer, web3, blockchain"`
- **Result**: Follows only accounts matching your criteria

**Bulk Operations**

**Goal**: Mass follow/unfollow without filtering
- **Mode**: Follow or Unfollow
- **Keywords**: *Leave empty*
- **Result**: Processes all available accounts

## Safety & Performance

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Smart Delays** | Random delays between actions | Natural, human-like behavior |
| **Duplicate Prevention** | Tracks processed profiles | Avoids repeated actions |
| **Unlimited Processing** | No artificial action limits | Handle large-scale operations |
| **Detailed Logging** | Comprehensive console output | Full transparency and debugging |
| **Error Handling** | Robust error management | Continues operation despite issues |

## Advanced Configuration

### Keyword Strategy Tips

**Best Practices**
- Use specific, relevant terms
- Combine broad + specific keywords
- Consider synonyms and variations
- Test with small lists first

**Avoid**
- Too generic keywords
- Special characters
- Very long keyword lists
- Offensive or spam terms

**Example Keyword Combinations:**
```
Tech: "developer, engineer, programming, coding"
Startup: "founder, entrepreneur, startup, business"
Design: "designer, UI, UX, creative, artist"
Marketing: "marketing, growth, SEO, content"
```

## Advanced Troubleshooting

**Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| **No buttons found** | Scroll down to load more profiles |
| **Keywords not working** | Check spelling, use lowercase |
| **Extension not starting** | Ensure you're on twitter.com or x.com |
| **Actions not happening** | Check browser console (F12) for errors |

### Debug Mode
Press `F12` to open browser console for detailed logging:
- Profile analysis results
- Keyword matching status  
- Action confirmations
- Error messages and troubleshooting

## Contributing

**We welcome contributions!** 

### Development Setup
```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/yourusername/Xmator.git
cd Xmator

# 3. Make changes and test
# 4. Submit pull request
```

### Guidelines
- Follow existing code style
- Add comprehensive comments
- Test on both twitter.com and x.com
- Update documentation for new features

## Version History

### v2.0 *(Current)*
- Complete codebase refactoring
- Unlimited processing capabilities  
- Enhanced bio detection algorithms
- Professional documentation
- Bulk processing support
- Improved UI/UX

### v1.x
- Basic follow/unfollow automation
- Simple keyword matching
- Initial Chrome extension

## Safety Features

- **Smart Delays**: Random delays between actions (2-4 seconds)
- **Duplicate Prevention**: Tracks processed profiles to avoid repeated actions
- **Error Handling**: Robust error handling with detailed logging
- **Rate Limiting**: Built-in protections against excessive automation

## Advanced Configuration Tips
- Use specific, relevant keywords for better targeting
- Combine broad and specific terms (e.g., "developer, react, javascript")
- Consider synonyms and variations of your interests
- Test with a few keywords first, then expand

### Best Practices
- Start with conservative keyword lists
- Monitor the console output to understand what's happening
- Use shorter sessions (let it run for 10-15 minutes, then pause)
- Regularly review and update your keywords

## Advanced Troubleshooting

### Common Issues
- **No buttons found**: Scroll down the page to load more profiles
- **Keywords not working**: Check spelling and use lowercase
- **Extension not starting**: Ensure you're on twitter.com or x.com
- **Actions not happening**: Check browser console for error messages

### Debug Mode
Open browser console (F12) to see detailed logging:
- Profile analysis results
- Keyword matching status
- Action confirmations
- Error messages

## Support & Links

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/chukwunonsoprosper/Xmator)
[![Issues](https://img.shields.io/badge/Report-Issues-red?style=for-the-badge&logo=github)](https://github.com/chukwunonsoprosper/Xmator/issues)
[![Twitter](https://img.shields.io/badge/Follow-@prospercode-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/prospercode)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Important Disclaimer**

*Use Xmator responsibly and in compliance with Twitter's Terms of Service. This tool is designed for legitimate network management and should be used thoughtfully to maintain a positive experience for all users.*
