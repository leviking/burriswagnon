# Amazing website for demonstration purposes

You don't need wix, squarespace, wordpress or anything else, you can just write html.

## Usage
If for whatever reason someone would want to add to this, the easiest way is to use github's built in editor. However, that may be somewhat tedious. Another option is to use a code editor like VSCode and it's "Live Server" extension. VSCode is plenty well documented, so googling could get one started with that. 

If you, for some reason don't want to use VSCode and/or it's liveserver extension, I would suggest downloading a simple http server software, there are plenty and your text editor of choice. 

Because these are just files it may be possible to edit just by dragging the files into the browser to open them without a server although I suspect things wouldn't quite work right when trying to navigate.

## Editing

I tried to stick to a logical, semantic html but may not have quite nailed it. Within the root you have files that match the navigation about.html is the about page for instance. The only non-obvious thing to a newcomer maybe that index.html refers to the base page, an "index" page if you will. 

## Projects

Projects are contained within a folder, as would logically make sense. Because the existing site has different types of projects for office, civic, etc. and various projects within those logical groupings I preserved those by putting subfolders for the projects for the groupings within projects. Civics projects for example are within '/projects/civics'. The index.html within each project sub-group will allow someone to see all of the projects within that subgroup.

For convenience there is a `/projects/project-template.html` which can be copied to be used for new projects.

Although it is possible to get further in the weeds and make sub-sub-folders for instance `/projects/residential/belhaven/index.html` I chose to refrain from that level of silliness until things get truly out of hand.

## Images

The folder structure of images more or less mirrors the rest of the structure to keep from cluttering the actual markup of the site with images. I may come to regret that. In any case, simply add folders where appropriate and use them in the html. If it turns out there needs to be video or anything else - I'll cross that bridge when we get to it.

## TODO
- [] replace all instances of nav with component
- [] replace all instances of side menu with component
- [] possibly make thumbnail a component
- [] make all images better
