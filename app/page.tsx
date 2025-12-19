import FileUploader from "@/components/FileUploader"
import Layout from "@/components/Layout"

export default function Home() {  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Document Sensitive Word Censor
          </h1>
          <p className="text-lg text-gray-600">
            Upload your documents and automatically censor sensitive information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FileUploader />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            How it works:
          </h2>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Upload a document (PDF, DOCX, or TXT) by dragging it or clicking "Browse Files"</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Click "Upload and Censor" to process the document</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>View the results showing original and censored text side-by-side</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Click "Download" to save the censored text as a .txt file</span>
            </li>
          </ol>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-3">
            Sensitive words detected:
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'confidential',
              'secret',
              'password',
              'ssn',
              'credit card',
              'private',
              'classified',
              'restricted',
              'internal',
              'proprietary',

              // abuse / violence related
              'abuse',
              'abusive',
              'kill',
              'killing',
              'murder',
              'murdered',
              'violence',
              'violent',
              'assault',
              'harassment',
              'threat'
            ].map((word) => (<span key={word} className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-medium">
              {word}
            </span>
            ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}