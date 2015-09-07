var postcss = require('postcss');
var selectorParser = require('postcss-selector-parser');

module.exports = postcss.plugin('postcss-mediascope', function (prefixes) {
    return function (css) {
        css.walkAtRules('mediascope', function (node) {
            prefixes.forEach(function (prefix) {
                var mediaNode = postcss.atRule({
                    name: 'media',
                    params: prefix.query
                });
                if (prefix.variables) {
                    Object.keys(prefix.variables).forEach(function (varName) {
                        mediaNode.append(postcss.decl({
                            prop: '$' + varName,
                            value: prefix.variables[varName]
                        }));
                    });
                }
                mediaNode.moveBefore(node);
                // Clone child nodes into mediaNode
                node.each(function (subNode) {
                    var mediaSubNode = subNode.clone();
                    mediaNode.append(mediaSubNode);
                });
            });
            node.remove();
        });
    };
});
