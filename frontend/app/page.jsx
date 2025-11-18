'use client'

import { LayoutWrapper } from '@/components/shared/layout-wrapper'

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="w-full max-w-4xl mx-auto px-4 py-20 animate-fade-in-scale">
        
        {/* Branding Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
          Welcome to SuiHuman
        </h1>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg mb-14">
          The world’s first bot-less, trust-driven social network powered by zero-knowledge proofs,
          Sui Move smart contracts, and decentralized storage.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-103 transition-transform duration-300 animate-slide-in-top">
            <h2 className="text-xl font-semibold mb-2 text-primary">🧬 Zero-Bot Verification</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every user proves they are human using <span className="text-accent font-medium">World ID</span> /
              <span className="text-accent font-medium"> ZK human proofs</span>.  
              No bots. No fake identities. One real human = one real account.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-103 transition-transform duration-300 animate-slide-in-top"
               style={{ animationDelay: '80ms' }}>
            <h2 className="text-xl font-semibold mb-2 text-primary">🔗 On-Chain Trust System</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              User registry, posts, likes, and interactions are secured using 
              <span className="text-accent font-medium"> Sui Move smart contracts</span> for transparency and fairness.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-103 transition-transform duration-300 animate-slide-in-top"
               style={{ animationDelay: '160ms' }}>
            <h2 className="text-xl font-semibold mb-2 text-primary">🗄️ Walrus Decentralized Storage</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Large content (images, long posts, media) is stored cheaply and reliably on 
              <span className="text-accent font-medium"> Walrus</span>, ensuring censorship resistance and permanence.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-103 transition-transform duration-300 animate-slide-in-top"
               style={{ animationDelay: '240ms' }}>
            <h2 className="text-xl font-semibold mb-2 text-primary">🛡️ Private Content with Seal</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Control who can view your posts using 
              <span className="text-accent font-medium"> Seal cryptographic permissions</span>.  
              A privacy-preserving social graph unlike any other platform.
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-scale">
          <p className="text-muted-foreground mb-4">
            Join the future of authentic social networking.
          </p>
          <a
            href="/feed"
            className="px-6 py-3 font-medium rounded-full bg-primary/20 text-primary border border-primary/40 hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-lg"
          >
            Enter SuiHuman
          </a>
        </div>

      </div>
    </LayoutWrapper>
  )
}
