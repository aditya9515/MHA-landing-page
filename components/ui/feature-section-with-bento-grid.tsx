import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Something new!
              </h2>

              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Now more about upcoming new features and hosting times of the
                agent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emotional Connectivity */}
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex items-center justify-center">
              <div className="flex flex-col text-center">
                <h3 className="text-xl tracking-tight">
                  Emotional Connectivity
                </h3>

                <p className="text-muted-foreground max-w-xs text-base mx-auto">
                  Emily will be able to recognize and respond to your emotional
                  state, providing support that’s not just intelligent but also
                  empathetic.
                  <br />
                  <br />
                  Whether you’re feeling down, anxious, or just need someone to
                  talk to, Emily will be there to offer comfort and
                  understanding.
                  <br />
                  <br />
                  By relating your senarios with real world problems.
                </p>
              </div>
            </div>

            {/* Multi Persona */}
            <div className="bg-muted rounded-md aspect-square p-6 flex items-center justify-center">
              <div className="flex flex-col text-center">
                <h3 className="text-xl tracking-tight">Multi Persona</h3>

                <p className="text-muted-foreground max-w-xs text-base mx-auto">
                  You will be able to choose from multiple personas for Emily,
                  each with a unique style and approach.
                  <br />
                  <br />
                  Whether you prefer a calm, nurturing companion or a more
                  energetic, motivational friend, there’s an Emily personality
                  that fits your needs.
                </p>
              </div>
            </div>

            {/* Custom Persona */}
            <div className="bg-muted rounded-md aspect-square p-6 flex items-center justify-center">
              <div className="flex flex-col text-center">
                <h3 className="text-xl tracking-tight">Custom Persona</h3>

                <p className="text-muted-foreground max-w-xs text-base mx-auto">
                  In addition to pre-designed personas, you will have the option
                  to create your own custom Emily personality.
                  <br />
                  <br />
                  Tailor her responses, tone, and behavior to perfectly match
                  your preferences and needs, making her an even more
                  personalized companion.
                </p>
              </div>
            </div>

            {/* Past History Reasoning */}
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex items-center justify-center">
              <div className="flex flex-col text-center">
                <h3 className="text-xl tracking-tight">
                  Past History Resoning
                </h3>

                <p className="text-muted-foreground max-w-xs text-base mx-auto">
                  You will be able to share your past history with Emily,
                  allowing her to understand your background and experiences.
                  <br />
                  <br />
                  This will enable Emily to provide more personalized support
                  and advice, taking into account your unique circumstances and
                  history.
                  <br />
                  <br />
                  All in well underyou control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };