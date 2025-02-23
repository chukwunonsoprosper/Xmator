# Xmator – Smart Twitter Unfollow Automation

Xmator is an open-source Chrome extension that automatically unfollows Twitter users whose bio isn’t tech-related. It scans profiles, detects non-tech accounts, and removes them—helping you maintain a tech-focused network.

## 🚀 Features

✅ Scans Twitter bios for tech-related keywords  
✅ Automatically unfollows non-tech accounts  
✅ Keeps your Twitter feed clean and relevant  
✅ Runs directly in your browser as a Chrome extension  
✅ Open-source and fully customizable  

## 📥 Installation Guide

### 🔹 Quick Install (Chrome Extension Method)

1. Download Xmator from GitHub Releases github: [https://github.com/chukwunonsoprosper/Xmator].
2. Extract the ZIP file to a folder on your computer.
3. Open Google Chrome and go to: `chrome://extensions/`
4. Enable Developer mode (toggle at the top right).
5. Click "Load unpacked" and select the extracted Xmator folder.
6. Xmator is now installed and ready to use! 🎉

### 🔹 Open Source Install (Developer Mode)

If you want to modify or contribute to Xmator, clone the repository and install it manually:

```bash
git clone https://github.com/chukwunonsoprosper/Xmator.git
cd Xmator
```

Now follow the Chrome Extension Method above to install it.

## ⚡ How to Use Xmator

1. Open Twitter and go to your following list.
2. Click on the Xmator extension icon in your browser.
3. Click "Start" it will scan bios and unfollow non-tech accounts.
4. Done! Your Twitter following list is now more relevant and tech-focused.

## 🛠 Customization

### Modify Tech Keywords

You can customize the keywords Xmator uses to detect tech accounts:

1. Open the extension folder on your PC.
2. Edit the `config.js` file and update the `TECH_KEYWORDS` array:

```javascript
const TECH_KEYWORDS = ["developer", "engineer", "startup", "AI", "Web3", "cybersecurity"];
```

3. Save the file and reload the extension in Chrome.

## 🤝 Contributing

Want to improve Xmator? Feel free to:

✅ Report issues  
✅ Suggest new features  
✅ Submit a pull request  

To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a pull request

## 📢 Connect & Support

If you find this tool useful, drop a ⭐ on GitHub and share it with your network!

🔗 GitHub Repo: [https://github.com/chukwunonsoprosper/Xmator]  
🔗 Twitter: [@prospercode]