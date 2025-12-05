import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mb-3 mt-6" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600" {...props} />
          ),
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className="bg-gray-50 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200" {...props} />
            ) : (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props} />
            ),
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-900 rounded-lg overflow-x-auto my-6 not-prose" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-700 underline" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-8 w-full" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-300" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm text-gray-700 border-t" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}