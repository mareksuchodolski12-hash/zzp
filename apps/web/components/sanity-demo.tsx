import { getSiteSettings, getPages } from '@/lib/sanity';

/**
 * Demo component showing Sanity integration
 * Fetches site settings and pages from Sanity
 */
export async function SanityDemo() {
  try {
    const settings = await getSiteSettings();
    const pages = await getPages();

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Sanity Integration Demo</h3>

        {/* Settings */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Site Settings:</h4>
          {settings ? (
            <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-auto max-h-48">
              {JSON.stringify(settings, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 text-sm">
              ℹ️ No settings found (configure Sanity with real credentials to fetch data)
            </p>
          )}
        </div>

        {/* Pages */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Pages ({pages?.length || 0}):</h4>
          {pages && pages.length > 0 ? (
            <ul className="space-y-2">
              {pages.map((page: any) => (
                <li key={page._id} className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                  📄 {page.title} ({page.slug?.current || 'no-slug'})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              ℹ️ No pages found (add content in Sanity Studio to see them here)
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-sm text-gray-700 font-semibold mb-2">📌 To use Sanity integration:</p>
          <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
            <li>Configure real Sanity project ID and dataset in .env.local</li>
            <li>Manage content in your existing Sanity Studio project</li>
            <li>Add content via Sanity editor</li>
            <li>This component will automatically fetch and display it</li>
          </ol>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SanityDemo error:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
        <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ Sanity Connection Error</h3>
        <p className="text-red-700 text-sm">{String(error)}</p>
      </div>
    );
  }
}
