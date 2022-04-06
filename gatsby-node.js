const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for habit
  const habitPost = path.resolve("./src/templates/habit.js")

  const habitResult = await graphql(
    `
      {
        allContentfulHabit {
          nodes {
            name
            slug
          }
        }
      }
    `
  )

  if (habitResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      habitResult.errors
    )
    return
  }

  const habits = habitResult.data.allContentfulHabit.nodes

  // Create habit posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (habits.length > 0) {
    habits.forEach((habit, index) => {
      const previousPostSlug = index === 0 ? null : habits[index - 1].slug
      const nextPostSlug =
        index === habits.length - 1 ? null : habits[index + 1].slug

      createPage({
        path: `/habits/${habit.slug}/`,
        component: habitPost,
        context: {
          slug: habit.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
