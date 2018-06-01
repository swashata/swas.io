---
templateKey: static-page
title: What Do I Use?
---

This page lists the most recent things I am using. Just for the curious ones 🤓.
If you are looking for something not present here, just [twit](https://twitter.com/swashata).

## Editor & Dev Environment

* Currently working on a MacBook Pro 13" late 2017 model. It has 3.1 GHz Intel Core i5, 512GB of SSD and 8GB of RAM.
* [Visual Studio Code](https://code.visualstudio.com/) is my current editor. Very
recently I have switched from sublime text 3 and loving it so far.
* [Beautiful UI](https://vscbui.rocks) is a VSCode color theme that I have ported
from Sublime DA UI. I am using the tomorrow dark theme.
* [iTerm2](https://iterm2.com/) is my terminal right now. With this I am using zsh + [oh my zsh](http://ohmyz.sh/).
* [Sketch App](https://www.sketchapp.com/) is my go to solution for any graphics need that I can do myself. I am not a pro here.
* [VVV](https://varyingvagrantvagrants.org/) is what I use for WordPress development.

## Workflow Desktop Apps

* [Magnet](http://magnet.crowdcafe.com/) and [Divvy](http://mizage.com/divvy/) for quick window management.
* [Rocket](https://matthewpalmer.net/rocket/) for emojis 🎉💥🍪.
* I use mac's mission control a lot.

## Dotfiles

### `~/.zshrc`

```bash
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
# Custom Paths
export PATH="/usr/local/opt/php@7.0/bin:/usr/local/opt/php@7.0/sbin:/usr/local/sbin:/usr/local/opt/gettext/bin:/usr/local/opt/python/libexec/bin:/usr/local/opt/mariadb@10.0/bin:/Volumes/Development/DevDependency/wpcs/vendor/bin:/Users/swashata/.gem/ruby/2.3.0/bin:$PATH"

# Path to your oh-my-zsh installation.
export ZSH=/Users/swashata/.oh-my-zsh

# Path to our development directory
export WWWHOME=/Volumes/Development/vagrant/www

# Trim and beautify our custom path
zsh_custom_trimmed_dir() {
  MYPSDIR_AWK=$(cat << 'EOF'
BEGIN { FS = OFS = "/" }
{
   if (match($0, ENVIRON["HOME"])) {
     print ""
     sub(ENVIRON["HOME"], "")
   }
   if (! -z ENVIRON["WWWHOME"] && match($0, ENVIRON["WWWHOME"])) {
     print ""
     sub(ENVIRON["WWWHOME"], "")
   }
   if (length($0) > 8 && NF > 3)
      print "/.." NF-2 "..",$NF
   else
      print $0
}
EOF
)
  MYPSDIR='$(echo -n "$PWD" | awk "$MYPSDIR_AWK")'
  eval "echo  ${MYPSDIR}"
}
# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
# A custom trimmed directory
POWERLEVEL9K_CUSTOM_DIR="zsh_custom_trimmed_dir"
POWERLEVEL9K_CUSTOM_DIR_FOREGROUND='black'
POWERLEVEL9K_CUSTOM_DIR_BACKGROUND='195'
POWERLEVEL9K_MODE='nerdfont-complete'
POWERLEVEL9K_DISABLE_RPROMPT=true
POWERLEVEL9K_PROMPT_ON_NEWLINE=false
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(status context custom_dir rbenv vcs)
DEFAULT_USER=$USER

# Set list of themes to load
ZSH_THEME="powerlevel9k/powerlevel9k"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
  extract
  npm
  brew
)

source $ZSH/oh-my-zsh.sh

# Alias
alias vag='cd /Volumes/Development/vagrant; vagrant up'
alias vagd='cd /Volumes/Development/vagrant; vagrant halt'
alias eform='cd /Volumes/Development/vagrant/www/eform/public_html/wp-content/plugins/wp-fsqm-pro'
alias socialpress='cd /Volumes/Development/vagrant/www/socialpress/public_html/wp-content/plugins/wpq-social-press'
alias fontIconPicker='cd /Volumes/Development/vagrant/www/npm/public_html/fontIconPicker'
alias gfx='cd /Volumes/Development/WPQuark/Graphics/wpq-graphics'
alias wpupdate='cd /Volumes/Development/vagrant/www/wpupdate/public_html/wp-content/plugins/wpq-wp-update'
alias vrindia='cd /Volumes/Development/vagrant/www/vrindia/public_html/wp-content/plugins/e-rickshaw-inventory/'
alias vagc='cd /Volumes/Development/vagrant'
alias www='cd /Volumes/Development/vagrant/www'
alias bss='browser-sync start --directory --server --files "**/*.js" --files "**/*.css" --files "**/*.html" --index "index.html"'
alias devd='cd /Volumes/Development'
alias swas='cd /Volumes/Development/PersonalProjects/swas.io'
# Safe guard rm
alias rm=trash

# GPG2
export GPG_TTY=$(tty)

# WordPress Unit Test Environment
export WP_TESTS_DIR="/Volumes/Development/wptest/wordpress-tests-lib"
export WP_CORE_DIR="/Volumes/Development/wptest/wordpress/"

test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

# include Z
. /usr/local/etc/profile.d/z.sh

# added by travis gem
[ -f /Users/swashata/.travis/travis.sh ] && source /Users/swashata/.travis/travis.sh
```

### `vscode.js`

```json
{
	"editor.multiCursorModifier": "ctrlCmd",
	"editor.snippetSuggestions": "top",
	"editor.formatOnPaste": false,
	"editor.fontFamily": "Operator Mono SSM Lig",
	"workbench.iconTheme": "material-icon-theme",
	"editor.lineHeight": 25,
	// Enables font ligatures
	"editor.fontLigatures": true,
	// Controls if file decorations should use badges.
	"explorer.decorations.badges": false,
	"editor.fontSize": 14,
	"terminal.integrated.shell.osx": "/usr/local/bin/zsh",
	"terminal.integrated.fontFamily": "SauceCodePro Nerd Font Mono",
	"terminal.integrated.cursorStyle": "line",
	"terminal.integrated.cursorBlinking": true,
	"terminal.integrated.fontSize": 14,
	"phpcs.ignorePatterns": [
		"**/vendor/**"
	],
	"files.trimTrailingWhitespace": true,
	"files.insertFinalNewline": true,
	"eslint.packageManager": "yarn",
	"php.suggest.basic": false,
	"debug.allowBreakpointsEverywhere": true,
	"editor.insertSpaces": false,
	"editor.letterSpacing": 0.5,
	"editor.fontWeight": "400",
	"editor.renderWhitespace": "none",
	"emmet.includeLanguages": {
		"javascript": "javascriptreact",
		"plaintext": "jade",
		"vue-html": "html"
	},
	"window.title": "${activeEditorShort}${separator}${rootName}${seperator}${dirty}",
	"eslint.enable": true,
	"eslint.autoFixOnSave": false,
	"eslint.alwaysShowStatus": true,
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		"html"
	],
	"workbench.statusBar.feedback.visible": false,
	"editor.rulers": [
		80,
		100,
		120
	],
	"cSpell.userWords": [
		"gitignore"
	],
	"explorer.confirmDragAndDrop": false,
	"css.validate": false,
	"less.validate": false,
	"scss.validate": false,
	"json.schemas": [
		{
			"fileMatch": [
				"cypress.json"
			],
			"url": "https://on.cypress.io/cypress.schema.json"
		},
		{
			"fileMatch": [
				".prettierrc.json"
			],
			"url": "http://json.schemastore.org/prettierrc"
		}
	],
	"whiteviz.maximumLimit": 500,
	"whiteviz.expandedTabIndicator": false,
	"emmet.triggerExpansionOnTab": false,
	"javascript.validate.enable": false,
	"licenser.license": "GPLv3",
	"licenser.author": "Swashata Ghosh <swashata@wpquark.com>",
	"editor.tabSize": 4,
	"editor.occurrencesHighlight": true,
	"typescript.tsserver.log": "verbose",
	"typescript.autoImportSuggestions.enabled": true,
	"typescript.quickSuggestionsForPaths": true,
	"npm-intellisense.importES6": true,
	"npm-intellisense.scanDevDependencies": false,
	"npm-intellisense.showBuildInLibs": true,
	"workbench.tree.horizontalScrolling": true,
	"php-docblocker.author": {
		"name": "Swashata Ghosh",
		"email": "swashata@wpquark.com"
	},
	"explorer.autoReveal": false,
	"files.associations": {
		"*.xml.dist": "xml",
		"*.json": "jsonc"
	},
	"editor.quickSuggestions": {
		"other": true,
		"comments": false,
		"strings": true
	},
	"path-autocomplete.transformations": [
		{
			"type": "replace",
			"parameters": [
				"^_",
				""
			],
			"when": {
				"fileName": "\\.scss$"
			}
		}
	],
	"files.autoSave": "off",
	"editor.acceptSuggestionOnEnter": "smart",
	"window.closeWhenEmpty": false,
	"editor.detectIndentation": true,
	"editor.showFoldingControls": "always",
	"editor.matchBrackets": true,
	"editor.trimAutoWhitespace": true,
	"editor.wordSeparators": "./\\()\"'-:,.;<>~!@#$%^&*|+=[]{}`~?",
	"editor.colorDecorators": true,
	"editor.cursorStyle": "line-thin",
	"colorize.languages": [
		"css",
		"sass",
		"scss",
		"less",
		"postcss",
		"sss",
		"stylus",
		"xml",
		"svg",
		"json",
		"jsonc"
	],
	"colorize.activate_variables_support_beta": false,
	"workbench.colorTheme": "βui - Tomorrow Dark",
	"editor.dragAndDrop": false,
	"editor.find.autoFindInSelection": true,
	"editor.emptySelectionClipboard": true,
	"colorize.files_extensions": [
		".tmTheme"
	],
	"vscode_custom_css.imports": [
		"file:///Users/swashata/.vscode_custom.css"
	],
	"workbench.editor.enablePreviewFromQuickOpen": false,
	"cSpell.enabled": false,
	"material-icon-theme.activeIconPack": "react_redux",
	"[yaml]": {
		"editor.insertSpaces": true,
		"editor.tabSize": 2,
		"editor.autoIndent": false,
		"editor.detectIndentation": true
	},
	"window.zoomLevel": 0,
	"window.clickThroughInactive": false
}
```
