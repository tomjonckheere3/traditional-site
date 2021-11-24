async function fetchAPI(query, { variables, preview } = {}) {
  console.log(process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API)
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview
          ? process.env.NEXT_PUBLIC_GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.NEXT_PUBLIC_GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(where: {slug: $slug}, stage: $stage) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        stage: 'DRAFT',
        slug,
      },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    {
      posts(orderBy: date_DESC, first: 20) {
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:crop,
                width:2000,
                height:1000
              }
            }
          })
        }
        author {
          name
          picture {
            url(transformation: {
              image: {
                resize: {
                  width:100,
                  height:100,
                  fit:crop
                }
              }
            })
          }
        }
      }
    }
  `,
    { preview }
  )
  return data.posts
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(stage: $stage, where: {slug: $slug}) {
        title
        slug
        content {
          html
        }
        date
        ogImage: coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        author {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
      }
      morePosts: posts(orderBy: date_DESC, first: 2, where: {slug_not_in: [$slug]}) {
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        author {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
      }
    }
  `,
    {
      preview,
      variables: {
        stage: preview ? 'DRAFT' : 'PUBLISHED',
        slug,
      },
    }
  )
  return data
}

export async function getAboutPageData() {
  const data = await fetchAPI(
    `query MyQuery {
      page(where: {id: "cke1ffer402co0156d87fjc5d"}) {
        id
        slug
        stage
        subtitle
        title
        content {
          html
        }
      }
    }`
  )
  return data.page
}

export async function getGeneralInfoPageData() {
  const data = await fetchAPI(
    `query MyQuery {
      page(where: {id: "ckwchz6086ssk0a01cv4lqdc6"}) {
        id
        slug
        stage
        subtitle
        title
        content {
          html
        }
      }
    }`
  )
    return data.page
}

export async function createCustomerMessage(name, email, subject, message) {

  const date = new Date()

  const data = await fetchAPI(
    `mutation MyMutation($name: String!, $email: String!, $subject: String!, $message: String!, $date: DateTime!) {
      createCustomerMessage(
        data: {name: $name, email: $email, subject: $subject, message: $message, date: $date}
      ) {
        id
      }
    }`,
    {
      variables: {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: date.toISOString()
      }
    }
  )

  console.log(data)
}