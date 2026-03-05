"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MovieDetailsTable } from "@/components/movie/movie-details-table";
import { RatingMeter } from "@/components/movie/rating-meter";
import { TypewriterQuote } from "@/components/movie/typewriter-quote";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Navigation } from "@/components/ui/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getMovieSentiment } from "@/lib/ai";
import { getMovieDetails } from "@/lib/movie";

type Movie = {
  title: string;
  year: string;
  rating: string;
  plot: string;
  poster: string;
  cast?: string;
};

const sampleIds = ["tt0133093", "tt1375666", "tt0111161", "tt0468569"] as const;

function extractClassification(insight: string): "Positive" | "Mixed" | "Negative" | null {
  const match = insight.match(/classification:\s*(positive|mixed|negative)/i);
  if (!match?.[1]) {
    return null;
  }

  const value = match[1].toLowerCase();
  if (value === "positive") return "Positive";
  if (value === "mixed") return "Mixed";
  if (value === "negative") return "Negative";
  return null;
}

function classificationStyle(classification: "Positive" | "Mixed" | "Negative") {
  if (classification === "Positive") {
    return "bg-emerald-500/15 text-emerald-200 border-emerald-300/35";
  }

  if (classification === "Mixed") {
    return "bg-amber-500/15 text-amber-200 border-amber-300/35";
  }

  return "bg-rose-500/15 text-rose-200 border-rose-300/35";
}

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const classification = useMemo(() => extractClassification(aiInsight), [aiInsight]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    const normalizedImdbId = imdbId.trim();
    if (!normalizedImdbId) return;

    setLoading(true);
    setError("");
    setMovie(null);
    setAiInsight("");
    setAiLoading(false);

    try {
      const data = await getMovieDetails(normalizedImdbId);

      if (!data) {
        setError("Movie not found. Check the IMDb ID and try again.");
        return;
      }

      setMovie(data);

      setAiLoading(true);
      getMovieSentiment(data.title, data.plot)
        .then((res) => setAiInsight(res))
        .catch(() => setAiInsight("AI analysis unavailable."))
        .finally(() => setAiLoading(false));
    } catch {
      setError("Server error. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen app-grid-overlay">
      <Navigation
        title="Cine Insight AI"
        subtitle="Look up a film by IMDb ID and get instant sentiment analysis"
        onHelpClick={() => setHelpModalOpen(true)}
      />

      <Container size="xl" className="relative py-8 sm:py-10 lg:py-14">
        <section className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">AI Movie Insight Builder</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Understand a film before you press play.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              Enter an IMDb ID to fetch plot, cast, and rating from OMDb, then get a concise AI-generated vibe summary and sentiment classification.
            </p>
          </motion.div>

          <Card className="glass-panel">
            <CardHeader className="mb-4">
              <CardTitle className="text-lg">Quick Start</CardTitle>
              <CardDescription>Use a sample IMDb ID or paste your own.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sampleIds.map((id) => (
                  <Button key={id} variant="secondary" size="sm" onClick={() => setImdbId(id)}>
                    {id}
                  </Button>
                ))}
              </div>
              <p className="pt-3 text-xs text-slate-400">Tip: IDs start with <span className="font-medium text-slate-200">tt</span>, like <span className="font-medium text-slate-200">tt0133093</span>.</p>
            </CardContent>
          </Card>
        </section>

        <Card className="glass-panel mb-8 lg:mb-10">
          <CardHeader>
            <CardTitle className="text-2xl">Analyze a Movie</CardTitle>
            <CardDescription>Search uses server-side actions and does not expose your API keys in the client.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-[1fr_auto]" aria-label="Movie analysis form">
              <div className="space-y-2">
                <label htmlFor="imdb-id" className="text-sm font-medium text-slate-200">
                  IMDb ID
                </label>
                <Input
                  id="imdb-id"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="e.g. tt0133093"
                  value={imdbId}
                  onChange={(e) => setImdbId(e.target.value)}
                  aria-describedby="imdb-help"
                />
                <p id="imdb-help" className="text-xs text-slate-400">
                  Use the ID from an IMDb URL such as imdb.com/title/tt0133093.
                </p>
              </div>

              <div className="flex items-end gap-2 sm:pb-6">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading || !imdbId.trim()}>
                  {loading ? "Analyzing..." : "Analyze Movie"}
                </Button>
                <Button type="button" variant="ghost" size="lg" onClick={() => setHelpModalOpen(true)}>
                  Help
                </Button>
              </div>
            </form>

            {loading ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4" aria-live="polite">
                <p className="mb-3 text-sm text-slate-300">Fetching movie metadata and preparing AI response...</p>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {error ? <Alert variant="error" title="Search failed" description={error} className="mb-8" /> : null}

        <AnimatePresence mode="wait">
          {movie ? (
            <motion.section
              key={`${movie.title}-${movie.year}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]"
            >
              <Card className="glass-panel overflow-hidden p-0">
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={
                      movie.poster && movie.poster !== "N/A"
                        ? movie.poster
                        : "https://via.placeholder.com/400x600?text=No+Poster"
                    }
                    alt={`${movie.title} movie poster`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 34vw"
                    className="object-cover"
                  />
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="glass-panel">
                  <CardHeader className="mb-4 space-y-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Movie Overview</p>
                    <CardTitle className="text-3xl sm:text-4xl">
                      {movie.title} <span className="text-slate-400">({movie.year})</span>
                    </CardTitle>
                    <CardDescription className="text-base text-slate-300">Plot summary</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <RatingMeter value={movie.rating} />
                    <TypewriterQuote text={movie.plot} />
                    <MovieDetailsTable year={movie.year} rating={movie.rating} cast={movie.cast} />
                  </CardContent>
                </Card>

                <Card className="glass-panel">
                  <CardHeader className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI Sentiment</p>
                      <CardTitle className="mt-2 text-2xl">Critic Snapshot</CardTitle>
                    </div>

                    {classification ? (
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${classificationStyle(classification)}`}>
                        {classification}
                      </span>
                    ) : null}
                  </CardHeader>

                  <CardContent>
                    {aiLoading ? (
                      <div className="space-y-3" aria-live="polite">
                        <p className="text-sm text-slate-300">Generating AI analysis...</p>
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-11/12" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    ) : aiInsight ? (
                      <p className="whitespace-pre-wrap text-sm/7 text-slate-100">{aiInsight}</p>
                    ) : (
                      <Alert
                        title="AI output pending"
                        description="Analysis appears after metadata loads."
                        variant="info"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          ) : (
            !loading && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="float-in"
              >
                <Card className="glass-panel border-dashed border-white/20 text-center">
                  <CardHeader>
                    <CardTitle className="text-2xl">No movie loaded yet</CardTitle>
                    <CardDescription>
                      Start by entering an IMDb ID above. Results and AI insight will appear here.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.section>
            )
          )}
        </AnimatePresence>
      </Container>

      <Modal
        open={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="How to find an IMDb ID"
        description="Use the title page URL on IMDb to copy the right ID."
      >
        <ol className="list-decimal space-y-2 pl-4">
          <li>Open the movie page on IMDb.</li>
          <li>Copy the part after <span className="font-medium">/title/</span> from the URL.</li>
          <li>Paste it here. Example: <span className="font-medium">tt0133093</span>.</li>
        </ol>
      </Modal>
    </main>
  );
}
