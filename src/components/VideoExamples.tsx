import { VideoBackground } from './VideoBackground';
import { VideoPlayer } from './VideoPlayer';

/**
 * Video Implementation Examples for The Beauty Trip
 * 
 * This file demonstrates different ways to use video throughout the platform.
 * Copy the examples you need into your actual components (HomePage, TourTrips, etc.)
 * 
 * STOCK VIDEO SOURCES:
 * - Pexels: https://www.pexels.com/videos/
 * - Pixabay: https://pixabay.com/videos/
 * - Coverr: https://coverr.co/
 * 
 * RECOMMENDED SEARCH TERMS:
 * - "luxury spa wellness"
 * - "tropical resort caribbean"
 * - "wellness retreat meditation"
 * - "beauty treatment spa"
 * - "dominican republic beach"
 * - "dental clinic modern"
 */

export function VideoExamples() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      
      {/* ========================================
          EXAMPLE 1: HERO BACKGROUND VIDEO
          ======================================== 
          Perfect for: Landing page hero section
          Replace the static hero image with cinematic video
      */}
      <section className="relative">
        <VideoBackground
          videoUrl="https://player.vimeo.com/progressive_redirect/playback/898618370/rendition/1080p/file.mp4?loc=external&signature=example"
          posterUrl="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          overlay="dark"
          overlayOpacity={0.5}
          className="min-h-screen"
        >
          {/* Your hero content here */}
          <div className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-7xl text-white mb-6">
              Stop Dreaming. Start Living the Journey.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12">
              Where World-Class Wellness Meets Pure, Unfiltered Escape
            </p>
            <button className="px-8 py-4 bg-[#B8985B] text-white rounded-full hover:bg-[#A17E4A] transition-colors">
              Claim Your Sanctuary
            </button>
          </div>
        </VideoBackground>
      </section>

      {/* ========================================
          EXAMPLE 2: TESTIMONIAL VIDEOS
          ======================================== 
          Perfect for: Client success stories
      */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-[#111111]">
            Transformation Stories
          </h2>
          <p className="text-xl text-center text-[#717182] mb-16 italic">
            Real journeys. Real results. Real radiance.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <VideoPlayer
              videoUrl="https://example.com/testimonial-1.mp4"
              posterUrl="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
              title="Sarah's Journey"
              caption="From hesitation to absolute confidence in 7 days"
              aspectRatio="16/9"
            />
            
            <VideoPlayer
              videoUrl="https://example.com/testimonial-2.mp4"
              posterUrl="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80"
              title="Maria's Transformation"
              caption="The smile she always dreamed of, finally hers"
              aspectRatio="16/9"
            />
          </div>
        </div>
      </section>

      {/* ========================================
          EXAMPLE 3: PROCEDURE SHOWCASE
          ======================================== 
          Perfect for: Treatment demonstrations
      */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-[#111111]">
            The Experience
          </h2>
          
          <VideoPlayer
            videoUrl="https://example.com/procedure-demo.mp4"
            posterUrl="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80"
            title="Your Journey, Visualized"
            caption="World-class care meets Caribbean tranquility"
            aspectRatio="16/9"
          />
        </div>
      </section>

      {/* ========================================
          EXAMPLE 4: SANCTUARY VIRTUAL TOUR
          ======================================== 
          Perfect for: Recovery villa showcases
      */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-[#111111]">
            Your Sanctuary Awaits
          </h2>
          <p className="text-xl text-center text-[#717182] mb-16 italic">
            Where healing meets luxury
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <VideoPlayer
              videoUrl="https://example.com/villa-radiance.mp4"
              posterUrl="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
              title="Radiance Villa"
              caption="Oceanfront serenity for your early recovery"
              aspectRatio="4/3"
              showControls={true}
            />
            
            <VideoPlayer
              videoUrl="https://example.com/villa-polish.mp4"
              posterUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
              title="Polish Retreat"
              caption="Modern luxury meets tropical paradise"
              aspectRatio="4/3"
              showControls={true}
            />
            
            <VideoPlayer
              videoUrl="https://example.com/villa-sanctuary.mp4"
              posterUrl="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80"
              title="Sanctuary Estate"
              caption="Ultimate privacy, ultimate transformation"
              aspectRatio="4/3"
              showControls={true}
            />
          </div>
        </div>
      </section>

      {/* ========================================
          EXAMPLE 5: SPLIT SCREEN (Text + Video)
          ======================================== 
          Perfect for: Feature explanations
      */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6 text-[#111111]">
                Why Dominican Republic?
              </h2>
              <p className="text-lg text-[#717182] mb-6 leading-relaxed">
                Beyond the savings (up to 70% vs US prices), you'll discover world-class specialists, 
                cutting-edge facilities, and the kind of personalized care that's become rare in Western medicine.
              </p>
              <p className="text-lg text-[#717182] mb-8 leading-relaxed">
                Add in pristine beaches, luxury accommodations, and a recovery period that feels more 
                like a retreat than rehab, and you'll understand why thousands choose this path.
              </p>
              <button className="px-8 py-4 bg-[#B8985B] text-white rounded-full hover:bg-[#A17E4A] transition-colors">
                Explore Destinations
              </button>
            </div>
            
            <VideoPlayer
              videoUrl="https://example.com/destination-highlight.mp4"
              posterUrl="https://images.unsplash.com/photo-1544989164-fb0fdd261c3d?w=800&q=80"
              aspectRatio="16/9"
              showControls={true}
            />
          </div>
        </div>
      </section>

      {/* ========================================
          EXAMPLE 6: AUTOPLAY BACKGROUND SECTION
          ======================================== 
          Perfect for: Immersive content sections
      */}
      <section className="relative">
        <VideoBackground
          videoUrl="https://example.com/wellness-ambiance.mp4"
          posterUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80"
          overlay="blush"
          overlayOpacity={0.2}
          className="py-32"
        >
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl text-[#111111] mb-8">
              More Than a Trip. A Transformation.
            </h2>
            <p className="text-xl text-[#111111]/80 leading-relaxed">
              We don't just book your procedures. We curate your entire journey—from specialist 
              selection to recovery activities, from airport pickup to your final sunset toast.
            </p>
          </div>
        </VideoBackground>
      </section>

      {/* ========================================
          EXAMPLE 7: MOBILE-OPTIMIZED VERTICAL VIDEO
          ======================================== 
          Perfect for: Social-style content, testimonials
      */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl mb-16 text-[#111111]">
            Real Stories, Real People
          </h2>
          
          <VideoPlayer
            videoUrl="https://example.com/vertical-story.mp4"
            posterUrl="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80"
            caption="Swipe-worthy transformations you can trust"
            aspectRatio="9/16"
            className="max-w-sm mx-auto"
          />
        </div>
      </section>

    </div>
  );
}

/**
 * HOW TO USE IN YOUR ACTUAL COMPONENTS:
 * 
 * 1. For HomePage.tsx hero section:
 *    - Copy Example 1 and replace your current hero
 *    - Download a cinematic wellness video from Pexels
 * 
 * 2. For TourTrips.tsx:
 *    - Use Example 5 (split screen) for each tour description
 *    - Show destination highlights with video
 * 
 * 3. For Step4Recovery.tsx (sanctuary selection):
 *    - Use Example 4 (virtual tours) for each villa
 *    - Let users see inside their recovery space
 * 
 * 4. For TransformationPortal.tsx:
 *    - Use Example 2 for testimonials section
 *    - Build trust with video success stories
 * 
 * 5. For any informational section:
 *    - Use Example 6 (background ambiance)
 *    - Create cinematic mood without distracting
 */
