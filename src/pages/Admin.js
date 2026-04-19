import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  addProject,
  addQuote,
  deleteProjectById,
  deleteQuoteById,
  getAllProjects,
  getAllQuotes,
  PROJECT_CATEGORIES,
  PROJECT_SECTIONS,
  setProjectVisibility,
} from "../services/firebaseContent";
import { useToast } from "../components/ToastProvider";

const initialQuoteForm = {
  text: "",
};

const initialProjectForm = {
  title: "",
  imageUrl: "",
  category: "construction",
  section: "slider",
};

function Admin() {
  const { pushToast } = useToast();
  const [quoteForm, setQuoteForm] = useState(initialQuoteForm);
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [quoteSaving, setQuoteSaving] = useState(false);
  const [projectSaving, setProjectSaving] = useState(false);
  const [quoteError, setQuoteError] = useState("");
  const [projectError, setProjectError] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [projectMessage, setProjectMessage] = useState("");

  async function loadQuotes() {
    try {
      setQuotesLoading(true);
      setQuoteError("");
      const items = await getAllQuotes();
      setQuotes(items);
    } catch (error) {
      setQuoteError(error.message || "Failed to load quotes.");
    } finally {
      setQuotesLoading(false);
    }
  }

  async function loadProjects() {
    try {
      setProjectError("");
      const items = await getAllProjects();
      setProjects(items);
    } catch (error) {
      setProjectError(error.message || "Failed to load projects.");
    } finally {
      setProjectsLoading(false);
    }
  }

  useEffect(() => {
    loadQuotes();
    loadProjects();
  }, []);

  const handleQuoteChange = (event) => {
    setQuoteForm({ text: event.target.value });
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((current) => ({ ...current, [name]: value }));
  };

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();
    setQuoteError("");
    setQuoteMessage("");

    if (!quoteForm.text.trim()) {
      setQuoteError("Quote text is required.");
      return;
    }

    try {
      setQuoteSaving(true);
      await addQuote({ text: quoteForm.text.trim() });
      setQuoteForm(initialQuoteForm);
      await loadQuotes();
      setQuoteMessage("Active quote updated.");
      pushToast({ title: "Quote published successfully." });
    } catch (error) {
      setQuoteError(error.message || "Unable to save quote.");
      console.error("[Admin:handleQuoteSubmit]", error);
      pushToast({ title: error.message || "Unable to save quote.", tone: "error" });
    } finally {
      setQuoteSaving(false);
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setProjectError("");
    setProjectMessage("");

    if (!projectForm.title.trim() || !projectForm.imageUrl.trim() || !projectForm.category || !projectForm.section) {
      setProjectError("Project title, image URL, category, and section are required.");
      return;
    }

    try {
      setProjectSaving(true);
      await addProject({
        title: projectForm.title.trim(),
        imageUrl: projectForm.imageUrl.trim(),
        category: projectForm.category,
        section: projectForm.section,
      });
      setProjectForm(initialProjectForm);
      setProjectMessage("Project added successfully.");
      pushToast({ title: "Project saved successfully." });
      await loadProjects();
    } catch (error) {
      setProjectError(error.message || "Unable to save project.");
      pushToast({ title: error.message || "Unable to save project.", tone: "error" });
    } finally {
      setProjectSaving(false);
    }
  };

  const handleQuoteDelete = async (id) => {
    try {
      await deleteQuoteById(id);
      setQuotes((current) => current.filter((item) => item.id !== id));
      pushToast({ title: "Quote deleted." });
    } catch (error) {
      setQuoteError(error.message || "Unable to delete quote.");
      pushToast({ title: error.message || "Unable to delete quote.", tone: "error" });
    }
  };

  const handleProjectDelete = async (id) => {
    try {
      await deleteProjectById(id);
      setProjects((current) => current.filter((item) => item.id !== id));
      pushToast({ title: "Project deleted." });
    } catch (error) {
      setProjectError(error.message || "Unable to delete project.");
      pushToast({ title: error.message || "Unable to delete project.", tone: "error" });
    }
  };

  const handleProjectVisibility = async (project) => {
    try {
      await setProjectVisibility(project.id, !project.visible);
      setProjects((current) =>
        current.map((item) => (item.id === project.id ? { ...item, visible: !item.visible } : item))
      );
      pushToast({ title: `Project ${project.visible ? "hidden" : "made visible"}.` });
    } catch (error) {
      setProjectError(error.message || "Unable to update project visibility.");
      pushToast({ title: error.message || "Unable to update project visibility.", tone: "error" });
    }
  };

  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800">
      <Navbar type="home" />

      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-600">Daily Quote</p>
              <h1 className="mt-4 text-3xl font-bold text-emerald-900 sm:text-4xl">Publish homepage quote</h1>
              <p className="mt-3 text-sm text-slate-600">Only one quote stays active at a time. Publishing a new quote automatically deactivates the previous one.</p>

              <form onSubmit={handleQuoteSubmit} className="mt-8 space-y-4">
                <textarea
                  rows="6"
                  value={quoteForm.text}
                  onChange={handleQuoteChange}
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Enter the quote text"
                />
                {quoteError ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{quoteError}</p> : null}
                {quoteMessage ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{quoteMessage}</p> : null}
                <button
                  type="submit"
                  disabled={quoteSaving}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {quoteSaving ? "Publishing..." : "Publish Quote"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-900">Quotes</h2>
                  <p className="mt-1 text-sm text-slate-600">CMS history from the `quotes` collection.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {quotes.length} items
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {quotesLoading ? (
                  <LoadingSpinner label="Loading quotes..." />
                ) : quotes.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 px-6 py-10 text-center text-sm text-slate-600">
                    No quotes yet.
                  </div>
                ) : (
                  quotes.map((quote) => (
                    <div key={quote.id} className="rounded-3xl border border-emerald-100 bg-slate-50 p-5">
                      <p className="text-base leading-relaxed text-slate-800">&ldquo;{quote.text}&rdquo;</p>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-slate-500">
                          <p>{quote.active ? "Active Quote" : "Inactive Quote"}</p>
                          <p>{quote.createdAtLabel || "Just now"}</p>
                      </div>
                        <button
                          type="button"
                          onClick={() => handleQuoteDelete(quote.id)}
                          className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-600">Projects CMS</p>
              <h2 className="mt-4 text-3xl font-bold text-emerald-900 sm:text-4xl">Add project cards</h2>
              <p className="mt-3 text-sm text-slate-600">Assign each image to a single category and section so it only renders in the right page and slider.</p>

              <form onSubmit={handleProjectSubmit} className="mt-8 space-y-4">
                <input
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  placeholder="Project title"
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  name="imageUrl"
                  value={projectForm.imageUrl}
                  onChange={handleProjectChange}
                  placeholder="Cloudinary or external image URL"
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <select
                  name="category"
                  value={projectForm.category}
                  onChange={handleProjectChange}
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {PROJECT_CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  name="section"
                  value={projectForm.section}
                  onChange={handleProjectChange}
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {PROJECT_SECTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {projectError ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{projectError}</p> : null}
                {projectMessage ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{projectMessage}</p> : null}
                <button
                  type="submit"
                  disabled={projectSaving}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {projectSaving ? "Saving..." : "Save Project"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-900">Projects</h2>
                  <p className="mt-1 text-sm text-slate-600">Visible and hidden entries from the `projects` collection.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {projects.length} items
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {projectsLoading ? (
                  <LoadingSpinner label="Loading projects..." />
                ) : projects.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 px-6 py-10 text-center text-sm text-slate-600">
                    No projects yet.
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="overflow-hidden rounded-3xl border border-emerald-100 bg-slate-50">
                      <img src={project.imageUrl} alt={project.title} className="h-44 w-full object-cover" loading="lazy" />
                      <div className="space-y-3 p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-emerald-900">{project.title}</h3>
                            <p className="text-sm text-slate-500">{project.category} | {project.section} | {project.createdAtLabel || "Just now"}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                            project.visible ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                          }`}>
                            {project.visible ? "Visible" : "Hidden"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handleProjectVisibility(project)}
                            className="rounded-2xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                          >
                            {project.visible ? "Hide" : "Show"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleProjectDelete(project.id)}
                            className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Admin;
