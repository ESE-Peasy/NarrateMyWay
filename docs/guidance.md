---
nav_order: 3
title: Guidance
---

# Locally editing the website

#### We will remove this page in the future, but it is useful if anyone else wants to update the website.

* Ensure you have `Jekyll`and its pre-requisites (mainly `Ruby` and `RubyGems`) installed. See [here](https://jekyllrb.com/docs/).
* Navigate to the `docs/` directory
* Execute the following in your command line:

```
bundle exec jekyll serve --livereload
```

After a few seconds this should give you an output as follows:

```
...
LiveReload address: http://127.0.0.1:35729
Server address: http://127.0.0.1:4000
Server running... press ctrl-c to stop.
```

* Navigate to the server address specified
* Make changes as required and the webpage will automatically be updated. See [here](https://pmarsceill.github.io/just-the-docs/)
for customisation options for the theme we are using. (Feel free to change the theme, I just thought this one works well for
simplicity and how easy it is to add content)
* Note - if you modify the `_config.yml` file you will need to restart the server by executing step 3

## Using Code Blocks
Code blocks work the same as standard Markdown. Note that to use certain syntax in the code block you first need to stop Jekyll from attempting to parse it. Things with double-braces will need to be enclosed in raw/endraw blocks as mentioned [here](https://stackoverflow.com/questions/24102498/escaping-double-curly-braces-inside-a-markdown-code-block-in-jekyll).
