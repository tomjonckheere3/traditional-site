import contentStyles from './content-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div
      className={`max-w-2xl mx-auto content ${contentStyles.content}`}
      dangerouslySetInnerHTML={{ __html: content?.html }}
    />
  )
}
