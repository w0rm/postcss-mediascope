# postcss-mediascope

PostCSS plugin to declare [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables) for each media query.

This can be especially helpful for:

1. css rules that should only be triggered for particular media query (e.g. for responsive grids);
2. css declaration that should have different value for particular media query (e.g. adjusting font-size based on the screen size).

# Usage

```javascript
postcss([
    postcssMediascope([
        {
            query: 'only screen and (max-width: 500px)',
            variables: {
                color: 'red',
                media: 'phone'
            }
        },
        {
            query: 'only screen and (min-width: 501px) and (max-width: 900px)',
            variables: {
                color: 'blue',
                media: 'tablet'
            }
        }
    ]),
    postcssAdvancedVariables()
])

```

Running the following css code through `postcssMediascope` :

```css
@mediaprefix {
    .$media-test {
        color: $color;
    }
}
```

produces intermediate result:

```css
@media only screen and (max-width: 500px) {
    $color: red;
    $media: phone;
    .$media-test {
        color: $color;
    }
}
@media only screen and (min-width: 501px) and (max-width: 900px) {
    $color: blue;
    $media: tablet;
    .$media-test {
        color: $color;
    }
}
```

that then is processed through [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables), so it becomes:

```css
@media only screen and (max-width: 500px) {
    .phone-test {
        color: red;
    }
}
@media only screen and (min-width: 501px) and (max-width: 900px) {
    .tablet-test {
        color: blue;
    }
}
```
