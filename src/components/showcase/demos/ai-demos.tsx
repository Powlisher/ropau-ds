"use client"

import * as React from "react"
import { AIActions } from "@/components/ai/ai-actions"
import { AIAgent } from "@/components/ai/ai-agent"
import { AIArtifact } from "@/components/ai/ai-artifact"
import { AICodeBlock } from "@/components/ai/ai-code-block"
import { AIConfirmation } from "@/components/ai/ai-confirmation"
import { AIConversation } from "@/components/ai/ai-conversation"
import { AILoader } from "@/components/ai/ai-loader"
import { AIMessage } from "@/components/ai/ai-message"
import { AIPromptInput } from "@/components/ai/ai-prompt-input"
import { AIReasoning } from "@/components/ai/ai-reasoning"
import { AISources } from "@/components/ai/ai-sources"
import { AISuggestion } from "@/components/ai/ai-suggestion"
import { AITask } from "@/components/ai/ai-task"
import { AITool } from "@/components/ai/ai-tool"

export function AIActionsDemo() {
  return (
    <div className="group/message">
      <p className="mb-3 text-sm text-muted-foreground">Hover to reveal actions</p>
      <AIActions
        onCopy={() => {}}
        onRegenerate={() => {}}
        onLike={() => {}}
        onDislike={() => {}}
        className="opacity-100"
      />
    </div>
  )
}

export function AIAgentDemo() {
  return (
    <AIAgent
      name="Research Assistant"
      model="claude-opus-4-20250514"
      instructions="Analyze technical papers and extract key findings. Prioritize recent publications from peer-reviewed sources."
      tools={[
        { name: "search_papers", description: "Query academic databases for relevant papers" },
        { name: "extract_citations", description: "Parse bibliography and cross-reference sources" },
        { name: "summarize", description: "Generate structured summary of findings" },
      ]}
      className="max-w-md"
    />
  )
}

export function AIArtifactDemo() {
  return (
    <AIArtifact title="analysis-report.md" type="document" className="max-w-md">
      <div className="prose prose-sm text-sm text-muted-foreground">
        <p>The competitive analysis reveals three key differentiators in the current market landscape. Product adoption rates have increased 23% quarter-over-quarter, with the strongest growth in the enterprise segment.</p>
      </div>
    </AIArtifact>
  )
}

export function AICodeBlockDemo() {
  return (
    <AICodeBlock
      language="typescript"
      code={`import { createClient } from '@ropau/sdk'

const client = createClient({
  apiKey: process.env.ROPAU_API_KEY,
  region: 'eu-west-1',
})

const response = await client.analyze({
  document: fileBuffer,
  extractors: ['entities', 'sentiment'],
  confidence: 0.85,
})`}
      className="max-w-lg"
    />
  )
}

export function AIConfirmationDemo() {
  return (
    <AIConfirmation
      title="Deploy to production"
      description="This will replace the current live version with build #2847. All active sessions will be migrated gracefully over 30 seconds."
      onApprove={() => {}}
      onReject={() => {}}
      className="max-w-md"
    />
  )
}

export function AIConversationDemo() {
  return (
    <div className="h-[350px] max-w-lg rounded-xl border border-border overflow-hidden">
      <AIConversation>
        <AIMessage role="user" content="Can you review the authentication flow for our new onboarding? I want to make sure we handle edge cases properly." />
        <AIMessage role="assistant" content="I've reviewed the auth flow. Here are the key findings: the token refresh mechanism doesn't handle concurrent requests well, and there's no graceful degradation when the OAuth provider is down. I recommend implementing a request queue and adding a fallback email-based flow." />
        <AIMessage role="user" content="Good catch on the concurrent requests. Can you show me how to implement the queue?" />
      </AIConversation>
    </div>
  )
}

export function AILoaderDemo() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <AILoader size="sm" />
        <span className="text-xs text-muted-foreground font-mono tabular-nums">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AILoader size="md" />
        <span className="text-xs text-muted-foreground font-mono tabular-nums">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AILoader size="lg" />
        <span className="text-xs text-muted-foreground font-mono tabular-nums">32px</span>
      </div>
    </div>
  )
}

export function AIMessageDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <AIMessage
        role="user"
        content="What's the best approach for handling real-time data sync across multiple clients?"
      />
      <AIMessage
        role="assistant"
        content="For real-time sync, I recommend a CRDT-based approach using operational transforms. This handles conflicts gracefully without requiring a central authority. Libraries like Yjs or Automerge are production-ready options."
        attachments={[{ name: "sync-architecture.pdf", type: "application/pdf" }]}
      />
    </div>
  )
}

export function AIPromptInputDemo() {
  return (
    <div className="max-w-lg">
      <AIPromptInput
        onSubmit={() => {}}
        placeholder="Ask anything about the design system..."
      />
    </div>
  )
}

export function AIReasoningDemo() {
  return (
    <div className="max-w-lg">
      <AIReasoning
        content="The user is asking about authentication edge cases. I should consider: 1) Token expiration during active sessions, 2) Race conditions in concurrent refresh requests, 3) Network failures during OAuth callback, 4) Session hijacking prevention. Let me prioritize by impact severity."
        duration={8}
      />
    </div>
  )
}

export function AISourcesDemo() {
  return (
    <AISources
      sources={[
        { title: "OAuth 2.0 Security Best Current Practice", url: "https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics" },
        { title: "CRDT: Conflict-free Replicated Data Types", url: "https://hal.inria.fr/inria-00609399/document" },
        { title: "Next.js Authentication Patterns", url: "https://nextjs.org/docs/authentication" },
      ]}
      className="max-w-md"
    />
  )
}

export function AISuggestionDemo() {
  return (
    <AISuggestion
      suggestions={[
        "Explain the trade-offs",
        "Show me a code example",
        "Compare with alternatives",
        "What about security?",
      ]}
      onSelect={() => {}}
    />
  )
}

export function AITaskDemo() {
  return (
    <AITask
      tasks={[
        { label: "Analyzing repository structure", status: "completed", file: "src/" },
        { label: "Scanning authentication modules", status: "completed", file: "src/auth/" },
        { label: "Testing token refresh flow", status: "running", file: "src/auth/refresh.ts" },
        { label: "Generating security report", status: "pending" },
      ]}
      className="max-w-md"
    />
  )
}

export function AIToolDemo() {
  return (
    <AITool
      name="search_codebase"
      status="completed"
      input={{ query: "authentication middleware", scope: "src/", maxResults: 10 }}
      output={{ matches: 3, files: ["auth.ts", "middleware.ts", "session.ts"] }}
      className="max-w-md"
    />
  )
}

const aiDemoMap: Record<string, React.ComponentType> = {
  "ai-actions": AIActionsDemo,
  "ai-agent": AIAgentDemo,
  "ai-artifact": AIArtifactDemo,
  "ai-code-block": AICodeBlockDemo,
  "ai-confirmation": AIConfirmationDemo,
  "ai-conversation": AIConversationDemo,
  "ai-loader": AILoaderDemo,
  "ai-message": AIMessageDemo,
  "ai-prompt-input": AIPromptInputDemo,
  "ai-reasoning": AIReasoningDemo,
  "ai-sources": AISourcesDemo,
  "ai-suggestion": AISuggestionDemo,
  "ai-task": AITaskDemo,
  "ai-tool": AIToolDemo,
}

export function getAiDemo(slug: string): React.ComponentType | null {
  return aiDemoMap[slug] ?? null
}
