const path = require('path');

exports.createPages = ({ boundActionCreaters, graphql }) => {
    const { createPage } = boundActionCreaters

    const postTemplate = path.resolve('src/templates/blog-post.js');

    return graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    html 
                    id 
                    frontmatter {
                        path 
                        title
                        date
                        author

                    }
                }
            }
        }
    }
    
    
    
    
    `).then(res => {
        if (res.errors) {
            return Promise.reject(res.errors)
        }

        res.data.allMarkdownRemark.edgesforEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })

    })

}