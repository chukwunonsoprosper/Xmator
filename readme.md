# Xmator v2.0 – Smart Twitter Automation Tool

Xmator is an advanced Chrome extension that intelligently manages your Twitter network by analyzing user bios and performing automated follow/unfollow actions based on your specified keywords. Keep your Twitter feed relevant and focused!

## Key Features

- **Smart Bio Analysis** - Advanced bio text extraction with multiple detection methods
- **Keyword-Based Filtering** - Follow/unfollow based on bio keyword matching  
- **Two Automation Modes** - Follow relevant accounts OR unfollow irrelevant ones  
- **Enhanced User Interface** - Clean, intuitive popup with real-time feedback  
- **Duplicate Prevention** - Tracks processed profiles to avoid repeated actions  
- **Unlimited Processing** - No artificial limits on automation actions
- **Detailed Logging** - Comprehensive console output for monitoring  
- **X.com Support** - Works on both twitter.com and x.com  

## How It Works

### Unfollow Mode (Default)
- Analyzes bio text of accounts you're following
- **Keeps** accounts whose bios contain your specified keywords
- **Unfollows** accounts whose bios don't match your keywords
- **If no keywords specified**: Unfollows all accounts
- Perfect for cleaning up your following list while preserving relevant connections

### Follow Mode
- Analyzes bio text of suggested accounts
- **Follows** accounts whose bios contain your specified keywords
- **Skips** accounts whose bios don't match your keywords
- **If no keywords specified**: Follows all available accounts
- Great for building a targeted network of relevant connections

## Installation Guide

### Method 1: Download & Install
1. Download the latest release from GitHub
2. Extract the ZIP file to a folder
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top-right)
5. Click "Load unpacked" and select the Xmator folder
6. The Xmator extension is now installed!

### Method 2: Clone Repository
```bash
git clone https://github.com/chukwunonsoprosper/Xmator.git
cd Xmator
```
Then follow the installation steps above.

## Usage Instructions

1. **Navigate to Twitter/X** - Open twitter.com or x.com
2. **Go to relevant page**:
   - For **Unfollow mode**: Visit your Following page
   - For **Follow mode**: Visit Following page of accounts you want to follow from
3. **Open Xmator**: Click the extension icon in your browser
4. **Set Keywords** (Optional): Enter comma-separated keywords (e.g., "tech, developer, AI, startup")
5. **Choose Mode**: Select Follow or Unfollow mode
6. **Start Automation**: Click "Start Xmator"
7. **Monitor Progress**: Check browser console for detailed logging

## Example Scenarios

### Scenario 1: Clean Your Following List
- **Mode**: Unfollow
- **Keywords**: "developer, tech, startup, AI"
- **Result**: Keeps accounts with these keywords, unfollows others

### Scenario 2: Build a Tech Network
- **Mode**: Follow  
- **Keywords**: "software engineer, web3, blockchain"
- **Result**: Follows accounts matching these keywords

### Scenario 3: Mass Operations
- **Mode**: Follow or Unfollow
- **Keywords**: Leave empty
- **Result**: Processes all available accounts without keyword filtering

## Safety Features

- **Unlimited Processing**: No artificial limits on automation actions
- **Smart Delays**: Random delays between actions for natural behavior
- **Duplicate Prevention**: Tracks processed profiles to avoid repeated actions
- **Error Handling**: Robust error handling with detailed logging
- **Rate Limiting**: Built-in protections against excessive automation

## Advanced Configuration

### Keyword Strategy Tips
- Use specific, relevant keywords for better targeting
- Combine broad and specific terms (e.g., "developer, react, javascript")
- Consider synonyms and variations of your interests
- Leave keywords empty to process all accounts without filtering

### Best Practices
- Start with conservative keyword lists
- Monitor the console output to understand what's happening
- Use shorter sessions initially, then increase duration as needed
- Regularly review and update your keywords

## Troubleshooting

### Common Issues
- **No buttons found**: Scroll down the page to load more profiles
- **Keywords not working**: Check spelling and use lowercase
- **Extension not starting**: Ensure you're on twitter.com or x.com

## 🎯 Example Scenarios

### Scenario 1: Clean Your Following List
- **Mode**: Unfollow
- **Keywords**: "developer, tech, startup, AI"
- **Result**: Keeps accounts with these keywords, unfollows others

### Scenario 2: Build a Tech Network
- **Mode**: Follow  
- **Keywords**: "software engineer, web3, blockchain"
- **Result**: Follows accounts matching these keywords

## 🛡️ Safety Features

- **Session Limits**: Maximum 50 actions per session to prevent abuse
- **Smart Delays**: Random delays between actions (2-4 seconds)
- **Duplicate Prevention**: Tracks processed profiles to avoid repeated actions
- **Error Handling**: Robust error handling with detailed logging
- **Rate Limiting**: Built-in protections against excessive automation

## � Advanced Configuration

### Keyword Strategy Tips
- Use specific, relevant keywords for better targeting
- Combine broad and specific terms (e.g., "developer, react, javascript")
- Consider synonyms and variations of your interests
- Test with a few keywords first, then expand

### Best Practices
- Start with conservative keyword lists
- Monitor the console output to understand what's happening
- Use shorter sessions (let it run for 10-15 minutes, then pause)
- Regularly review and update your keywords

## 🐛 Troubleshooting

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

## Contributing

We welcome contributions to improve Xmator! Here's how you can help:

### Reporting Issues
- Use GitHub Issues to report bugs
- Include browser version, Twitter page, and error messages
- Provide steps to reproduce the issue

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Make changes and test thoroughly
4. Submit a pull request with clear description

### Feature Requests
- Suggest new features via GitHub Issues
- Explain the use case and expected behavior
- Consider contributing the implementation!

## Version History

### v2.0 (Current)
- Complete rewrite with enhanced bio detection
- Improved keyword matching algorithm
- Better user interface with mode explanations
- Added X.com support
- Enhanced error handling and logging
- Unlimited processing capabilities
- Professional codebase structure

### v1.0
- Basic follow/unfollow functionality
- Simple keyword matching
- Initial Chrome extension implementation

## Support & Community

**GitHub**: [https://github.com/chukwunonsoprosper/Xmator]  
**Issues**: Report bugs and request features  
**Twitter**: [@prospercode] - Follow for updates  

## License

This project is open source. Feel free to use, modify, and distribute according to the license terms.

---

**Disclaimer**: Use responsibly and in compliance with Twitter's Terms of Service. Automated actions should be used thoughtfully to maintain a positive platform experience for all users.