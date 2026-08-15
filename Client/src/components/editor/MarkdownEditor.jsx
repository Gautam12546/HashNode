import React, { useState } from 'react';
import MarkdownPreview from './MarkdownPreview';
import { Code2, Eye } from 'lucide-react';

const MarkdownEditor = ({ value, onChange, placeholder }) => {
  const [mobileTab, setMobileTab] = useState('write');

  return (
    <div>
      {/* Mobile segmented tab switcher — the two panes are side-by-side from lg upward */}
      <div className="flex lg:hidden mb-3 p-1 rounded-xl bg-gray-100 dark:bg-white/5 w-full">
        <button
          type="button"
          onClick={() => setMobileTab('write')}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium py-1.5 rounded-lg transition-colors ${
            mobileTab === 'write' ? 'bg-white dark:bg-[#12172A] text-brand-600 dark:text-brand-300 shadow-sm' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Code2 size={15} /> Write
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium py-1.5 rounded-lg transition-colors ${
            mobileTab === 'preview' ? 'bg-white dark:bg-[#12172A] text-brand-600 dark:text-brand-300 shadow-sm' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Eye size={15} /> Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className={mobileTab === 'write' ? 'block' : 'hidden lg:block'}>
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-gray-400 dark:text-gray-500 mb-1.5 px-1">
            <Code2 size={13} /> WRITE
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Write your Markdown content here...'}
            className="input font-mono text-sm min-h-[420px] resize-y leading-relaxed"
          />
        </div>
        <div className={mobileTab === 'preview' ? 'block' : 'hidden lg:block'}>
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-gray-400 dark:text-gray-500 mb-1.5 px-1">
            <Eye size={13} /> PREVIEW
          </div>
          <div className="bg-white dark:bg-[#12172A] border border-gray-200 dark:border-white/10 rounded-xl p-5 min-h-[420px] overflow-y-auto">
            {value ? (
              <div className="prose-hn prose-sm">
                <MarkdownPreview content={value} />
              </div>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">Your preview will appear here as you write...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
