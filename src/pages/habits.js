import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import HabitPreview from '../components/habit-preview'

class HabitsIndex extends React.Component {
  render() {
    const habits = get(this, 'props.data.allContentfulHabit.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Habits" />
        <HabitPreview habits={habits} />
      </Layout>
    )
  }
}

export default HabitsIndex

export const pageQuery = graphql`
  query HabitIndexQuery {
    allContentfulHabit(sort: { fields: [name], order: DESC }) {
      nodes {
        name
        slug
        tags
        difficulty
        duration
        icon {
          title
          file {
            contentType
            fileName
            url
          }
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        description {
          childMarkdownRemark {
            excerpt
          }
        }
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
