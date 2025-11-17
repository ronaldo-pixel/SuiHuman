'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { MediaUploader } from '@/components/create/media-uploader'
import { CaptionInput } from '@/components/create/caption-input'
import { TagEditor } from '@/components/create/tag-editor'
import { AnalysisStatusPanel } from '@/components/create/analysis-status'

export default function CreatePostPage() {
  const router = useRouter()
  const [media, setMedia] = useState(null)
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [analysisStatus, setAnalysisStatus] = useState({
    walrusHash: 'pending',
    sealVerification: 'pending',
    nautilusAnalysis: 'pending',
  })

  const handleRunAnalysis = async () => {
    if (!media) {
      alert('Please upload media first')
      return
    }

    setIsAnalyzing(true)
    setAnalysisStatus({
      walrusHash: 'pending',
      sealVerification: 'pending',
      nautilusAnalysis: 'pending',
    })

    // Simulate analysis steps
    await new Promise((r) => setTimeout(r, 800))
    setAnalysisStatus((p) => ({ ...p, walrusHash: 'completed' }))

    await new Promise((r) => setTimeout(r, 800))
    setAnalysisStatus((p) => ({ ...p, sealVerification: 'completed' }))

    await new Promise((r) => setTimeout(r, 800))
    setAnalysisStatus((p) => ({ ...p, nautilusAnalysis: 'completed' }))

    setIsAnalyzing(false)
    setAnalyzed(true)
  }

  const handlePublish = async () => {
    if (!media || !caption) {
      alert('Please fill in all fields')
      return
    }

    setIsPublishing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsPublishing(false)
    router.push('/')
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-8 animate-slide-in-top">
            Create New Post
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <MediaUploader media={media} onMediaChange={setMedia} />
              <CaptionInput caption={caption} onCaptionChange={setCaption} />
              <TagEditor tags={tags} onTagsChange={setTags} />

              {analyzed && (
                <AnalysisStatusPanel status={analysisStatus} />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 space-y-4 sticky top-20 animate-slide-in-bottom">
                <h3 className="font-semibold text-foreground">Authenticity Analysis</h3>

                <Button
                  onClick={handleRunAnalysis}
                  disabled={!media || isAnalyzing}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                >
                  {isAnalyzing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </Button>

                <Button
                  onClick={handlePublish}
                  disabled={!analyzed || !media || !caption || isPublishing}
                  className="w-full"
                  variant="outline"
                >
                  {isPublishing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isPublishing ? 'Publishing...' : 'Publish Post'}
                </Button>

                <div className="text-xs text-muted-foreground pt-4 border-t border-border/30">
                  <p className="font-semibold mb-2">Tips:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use clear, descriptive captions</li>
                    <li>Add relevant tags for discovery</li>
                    <li>Run authenticity analysis before posting</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
