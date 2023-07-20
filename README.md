# Chapter2
A reboot of the freeCodeCamp open source Chapter project



# Git2

---

## Contents

[Git](#git)

[Setting the default editor for git](#setting-the-default-editor-for-git)

[All the Command-Line Keyboard Shortcuts You Need to Know](#all-the-command-line-keyboard-shortcuts-you-need-to-know)

---


```sh
git clone
```


FOLDER=/Volumes/Data/Projects

NAME=Bookmarks2

mkdir $FOLDER/$NAME

cd $FOLDER/$NAME

echo "# Project: $NAME" >> README.md

---

## Git

git clone git@github.com:tomnoland/Git2.git

git init

git add .

git commit -m "And so, it begins."

--------------------------------------------------------------------------------

hub create

git remote add $NAME git@github.com:tomnoland/$NAME.git





How to install Xcode Command Line Tools
https://mac.install.guide/commandlinetools/index.html



Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


Install Hub
brew install hub

FOLDER=\
/Volumes/Data/Projects

NAME=\
Git2

git remote add $NAME git@github.com:tomnoland/$NAME.git



# Project_Notes

## This is a place to consolidate all my project notes.

---

## Setting the default editor for git

[How to use Visual Studio Code as default editor for git](https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git)


```sh
git config --global core.editor "code --wait"
```

```sh
git config --global -e
```

```sh
Example_of_shell_code_block
```

git config core.editor atom

git --global config ...

---

## Contents

[All the Command-Line Keyboard Shortcuts You Need to Know](#all-the-command-line-keyboard-shortcuts-you-need-to-know)

---

## Links

[Template for new projects](https://github.com/tomnoland/New-Project-Template/generate)

[Hub](https://hub.github.com/)

[Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)


---



```sh
Example_of_shell_code_block
```

```sh
cd /Volumes/Data/Projects
```
```sh
cd ~
```

---

```sh
REPO_NAME=XXX
```

```sh
PROJECT_DIR=/Volumes/Data/Projects && \
cd $PROJECT_DIR && \
git clone https://github.com/tomnoland/$REPO_NAME && \
cd $REPO_NAME
```

---

osascript -e 'tell application "Terminal" to set bounds of front window to {2, 579, 957, 1126}' &&\

osascript -e 'tell application "Finder" to set bounds of front window to {962, 579, 1917, 1126}' &&\

osascript -e 'tell application "Atom" to set bounds of front window to {962, 26, 1917, 573}' &&\

osascript -e 'tell application "Chrome" to set bounds of front window to {2, 26, 957, 573}'

---

hub delete -y tomnoland/$REPO_NAME

[How to create an encrypted directory in windows](https://www.tomsguide.com/us/encrypt-files-windows,news-18314.html)

[How to create an encrypted directory in Mac](https://www.howtogeek.com/183826/how-to-create-an-encrypted-file-container-disk-image-on-a-mac/)

[Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

---

git add README.md

git commit -m "Changed README.md file"

git push origin master

---

git pull origin master

---

/usr/bin/open -a /System/Library/CoreServices/Finder.app .

"/Applications/NetBeans/Apache NetBeans 11.1.app/Contents/Resources/NetBeans/bin/netbeans" README.md

---

docker-compose down

docker rm -f $(docker ps -a -q)

docker volume rm $(docker volume ls -q)

[How To Remove Docker Images, Containers, and Volumes](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)



---

## All the Command-Line Keyboard Shortcuts You Need to Know

### Moving the cursor

CTRL-A/HOME: Move to the beginning of a line.

CTRL-E/END: Move to the end of a line.

CTRL-B/LEFT: Move left one character.

CTRL-F/RIGHT: Move right one character.

ALT-B/CTRL-LEFT: Move left one word.

ALT-F/CTRL-RIGHT: Move right one word.

CTRL-XX: Hold CTRL and press X twice to move the cursor to the beginning of the line, and hold CTRL and press X twice again to move the cursor back.

### Editing text

CTRL-U: Cut all the characters.

CTRL-K: Cut the characters to the right of the cursor.

CTRL-H/BACKSPACE/DELETE (MACOS): Delete one character to the left.

CTRL-D/DELETE/FN DELETE (MACOS): Delete one character to the right.

CTRL-W: Cut one word to the left.

ALT-D: Cut one word to the right.

CTRL-Y: Paste the characters previously cut.

CTRL-_: Undo the last edit.

CTRL-XE: Open the $EDITOR to edit the line.

ALT-U: Change one word to the right to uppercase.

ALT-L: Change one word to the right to lowercase.

### Command completion

TAB: Attempt shell expansion on the current word. If that fails, attempt completion.

gi<TAB>     # git

ls *<TAB>   # ls folder1 folder2 file3

CTRL-G: List the expansion of the current word.

Managing the screen

CTRL-L: Clear screen (just like clear).

CTRL-S: Stop screen output. Useful for preventing processes from spamming the stdout.

CTRL-Q: Resume screen output.

### Managing processes

CTRL-C: Terminate the foreground process. (Also can be used to delete the whole line.)

CTRL-Z: Suspend the foreground process (use fg and bg to resume).

CTRL-D: Exit shell (just like exit).

### Accessing Command History

CTRL-R: Search the command history. Accept with ENTER/RETURN, abort with CTRL-G.

CTRL-P/UP: The previous command in history.

CTRL-N/DOWN: The next command in history.









