# Basic Sass Setup

## Asset File Structure
--assets  
----bootstrap  
----css  
------main.css (compiled)  
----fonts  
------(all required fonts in here, separate into folders if multiple fonts)  
----images  
------(images in here)  
----js  
------main.js (global scripts)  
------home.js (specific scripts)  
------someOtherPage.js (specific scripts for another page, if needed)  
----scss  
------main.scss (imports other files and compiles out to main.css)  
------typography.scss (fonts and text styles)  
------globals.scss (define global styles, colours etc)  
------header.scss  
------footer.scss  
------home.scss (page specific styles)  
------someOtherPage.scss (specific styles for another page, if needed)  


## Generics
Ideally we want to define a set of generic styles in the `globals.scss` file that we can reuse throughout the site. We dont want to be redifining the same heading style every time they appear in a section. Things that should most likely have generics are:
- Text styles
- Button styles
- Section paddings/margins
- Background image style and positioning
- Anything else thats appearing in an identical or extremely similar manner multiple times throughout the site

For fonts we want to be using rem units. So we should be defining the html/body font size in pixels (based on the generic paragraph font size in the design) and then basing our rems off of that. This also lets us easily scale fonts between devices. For example in `typography.scss` you could do something like:

    html, body {
        font-size: 18px;

        @include media-breakpoint-up(md) {
            font-size: 20px;
        }

        @include media-breakpoint-up(lg) {
            font-size: 24px;
        }

        h1 {
            font-size: 3rem;
        }

        h2 {
            font-size: 2rem;
        }

        p, span, li, a, {
            font-size: 1rem;
        }
    }


##Compiling Production Files
At the end, we are going to be spitting out a single css file - `main.css`. This should be generated from `main.scss` which should only include `@import` statements that include your other sass files. 

To compile you should only need to be running a simple sass watch such as: `sass --watch assets/scss/main.scss assets/css/main.css`

The compiled `main.css` gets added to your `head` and we're all good :)


---

# Basic Sass Style Guide

## Generic Example For A Section

Generally we want to label our sections with IDs and then nest elements as appropriate. There is no need to give every single element a class as our nesting is going to give more than enough specificity to the resulting CSS.


    #some-section-name {
        border: 1px solid black;
        
        .some-specific-element {
            background: blue;
            
            span {
                color: red;
            }
        }
    }
    
## Media Queries

Media queries should take place within the element in a mobile first manner and should ideally reference only bootstraps breakpoint mixins. For example:

    .some-element {
        // Mobile 
        background: red;

        // Tablet Portrait
        @include media-breakpoint-up(md) {
            background: green;
        }

        // Tablet Landscape
        @include media-breakpoint-up(lg) {
            background: blue;
        }

        // Desktop
        @include media-breakpoint-up(xl) {
            background: pink;
        }
    }

This both ties everything in to bootstrap which should account for the vast majority of situations and also keeps all the media queries with the element so at a glance we can see whats happening with this element across all devices without having to jump all around the file.


## Subclasses And Extending Generics

Extending generic classes can be made simple if there are multiple variations by using the `@extend` directive, essentially importing all the properties of the main class and then altering as needed without repeating styles.

    .button {
        color: #666;
        
        &:hover {
            color: #111;
        }
    }
    
    .dropdown-button {
        @extend .button;
        &::after { content: " \25BE"; }
    }
    
## Modifiers

Modifiers provide a really simple way to alter the behaviour of an element based on various factors like hover state and additional classes.

    .some-button {
        background: blue;
        
        &:hover {
            background: red;
        }
        
        &.active {
            backgroung: green;
        }
    }