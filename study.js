const NOTEBOOKS_KEY = "campusDeskCustomNotebooks";
const PAGES_KEY = "campusDeskNotebookPages";
const LEGACY_NOTES_KEY = "campusDeskStudyNotes";

const defaultNotebooks = [
    { id: "web", name: "Web Technology", lineOne: "Web", lineTwo: "Technology", color: "web" },
    { id: "git", name: "Git & GitHub", lineOne: "Git &", lineTwo: "GitHub", color: "git" },
    { id: "german", name: "German", lineOne: "German", lineTwo: "Language", color: "german" },
    { id: "personal", name: "Personal Notes", lineOne: "Personal", lineTwo: "Notes", color: "personal" }
];

const notebookBookcase = document.querySelector("#notebook-bookcase");
const notebookTiers = [
    document.querySelector("#notebook-tier-1"),
    document.querySelector("#notebook-tier-2"),
    document.querySelector("#notebook-tier-3")
];
const addNotebookDialog = document.querySelector("#add-notebook-dialog");
const addNotebookForm = document.querySelector("#add-notebook-form");
const newNotebookName = document.querySelector("#new-notebook-name");
const cancelNotebookButton = document.querySelector("#cancel-notebook");

const bookOverlay = document.querySelector("#book-overlay");
const openBook = document.querySelector("#open-book");
const openNotebookTitle = document.querySelector("#open-notebook-title");
const closeBookButton = document.querySelector("#close-book");
const deleteNotebookButton = document.querySelector("#delete-notebook");
const deleteConfirmation = document.querySelector("#delete-confirmation");
const cancelDeleteButton = document.querySelector("#cancel-delete");
const confirmDeleteButton = document.querySelector("#confirm-delete");

const pageEditors = {
    left: {
        form: document.querySelector("#left-page-form"),
        title: document.querySelector("#left-page-title"),
        body: document.querySelector("#left-page-body"),
        number: document.querySelector("#left-page-number"),
        count: document.querySelector("#left-word-count")
    },
    right: {
        form: document.querySelector("#right-page-form"),
        title: document.querySelector("#right-page-title"),
        body: document.querySelector("#right-page-body"),
        number: document.querySelector("#right-page-number"),
        count: document.querySelector("#right-word-count")
    }
};
const previousSpreadButton = document.querySelector("#previous-spread");
const nextSpreadButton = document.querySelector("#next-spread");
const mobilePreviousPageButton = document.querySelector("#mobile-previous-page");
const mobileNextPageButton = document.querySelector("#mobile-next-page");
const colourSwatches = document.querySelectorAll(".colour-swatch");
const activePageLabel = document.querySelector("#active-page-label");
const copyActivePageButton = document.querySelector("#copy-active-page");
const downloadActivePageButton = document.querySelector("#download-active-page");
const bookStatus = document.querySelector("#book-status");

const turningSheet = document.querySelector("#turning-sheet");
const turningFrontNumber = document.querySelector("#turning-front-number");
const turningFrontTitle = document.querySelector("#turning-front-title");
const turningFrontPreview = document.querySelector("#turning-front-preview");
const turningBackNumber = document.querySelector("#turning-back-number");
const turningBackTitle = document.querySelector("#turning-back-title");
const turningBackPreview = document.querySelector("#turning-back-preview");

let customNotebooks = readStoredValue(NOTEBOOKS_KEY, []);
let notebookPages = readStoredValue(PAGES_KEY, {});
let selectedNotebookId = null;
let spreadStart = 0;
let activeSide = "left";
let sourceBookButton = null;
let pageTurnLocked = false;
let closeTimer = null;
let resizeTimer = null;

function isSinglePageMode() {
    return window.matchMedia("(max-width: 900px)").matches;
}

function readStoredValue(key, fallback) {
    try {
        const savedValue = localStorage.getItem(key);
        return savedValue ? JSON.parse(savedValue) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveStoredValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        setBookStatus("Browser storage is unavailable. Download the page to keep it.");
        return false;
    }
}

function createId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return `${prefix}-${window.crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAllNotebooks() {
    return [...defaultNotebooks, ...customNotebooks];
}

function getNotebook(notebookId) {
    return getAllNotebooks().find((notebook) => notebook.id === notebookId);
}

function createBlankPage() {
    return {
        id: createId("page"),
        title: "",
        body: "",
        ink: "#2f3237",
        updatedAt: new Date().toISOString()
    };
}

function ensureNotebookPages(notebookId, minimumLength = 2) {
    if (!Array.isArray(notebookPages[notebookId])) {
        notebookPages[notebookId] = [];
    }

    while (notebookPages[notebookId].length < minimumLength) {
        notebookPages[notebookId].push(createBlankPage());
    }

    saveStoredValue(PAGES_KEY, notebookPages);
    return notebookPages[notebookId];
}

function migrateLegacyNotes() {
    if (Object.keys(notebookPages).length > 0) {
        return;
    }

    const legacyNotes = readStoredValue(LEGACY_NOTES_KEY, []);

    if (!Array.isArray(legacyNotes) || legacyNotes.length === 0) {
        return;
    }

    legacyNotes.forEach((note) => {
        if (!getNotebook(note.notebook)) {
            return;
        }

        if (!notebookPages[note.notebook]) {
            notebookPages[note.notebook] = [];
        }

        notebookPages[note.notebook].push({
            id: createId("page"),
            title: note.title || "",
            body: note.body || "",
            ink: "#2f3237",
            updatedAt: note.updatedAt || new Date().toISOString()
        });
    });

    Object.keys(notebookPages).forEach((notebookId) => {
        ensureNotebookPages(notebookId, 2);
    });
    saveStoredValue(PAGES_KEY, notebookPages);
}

function createNotebookButton(notebook) {
    const button = document.createElement("button");
    const title = document.createElement("span");
    const subtitle = document.createElement("small");

    button.type = "button";
    button.className = `notebook-book notebook-${notebook.color}`;
    button.dataset.notebook = notebook.id;
    button.setAttribute("aria-label", `Open ${notebook.name} notebook`);

    if (!bookOverlay.hidden && selectedNotebookId === notebook.id) {
        button.classList.add("is-away");
    }

    title.textContent = notebook.lineOne || notebook.name;
    subtitle.textContent = notebook.lineTwo || "Notebook";
    button.append(title, subtitle);
    return button;
}

function createAddNotebookButton() {
    const button = document.createElement("button");
    const plus = document.createElement("span");
    const label = document.createElement("small");

    button.type = "button";
    button.className = "notebook-book add-notebook-book";
    button.dataset.action = "add-notebook";
    button.setAttribute("aria-label", "Add a new notebook");

    plus.className = "plus-symbol";
    plus.setAttribute("aria-hidden", "true");
    plus.textContent = "+";
    label.textContent = "Add notebook";
    button.append(plus, label);
    return button;
}

function createDecorativeBook(index) {
    const book = document.createElement("span");
    book.className = `decorative-book decorative-book-${(index % 5) + 1}`;
    book.setAttribute("aria-hidden", "true");
    return book;
}

function createShelfSign() {
    const sign = document.createElement("aside");
    const title = document.createElement("strong");
    const message = document.createElement("span");

    sign.className = "shelf-sign";
    sign.setAttribute("aria-label", "Notebook shelf tip");
    title.textContent = "Create your own notebook";
    message.textContent = "Record your own ideas, one page at a time.";
    sign.append(title, message);
    return sign;
}

function getShelfCapacity() {
    const rowWidth = Math.max(160, notebookTiers[0].clientWidth);
    const rowStyles = window.getComputedStyle(notebookTiers[0]);
    const gap = Number.parseFloat(rowStyles.columnGap) || 8;
    const notebookWidth = 70;

    return Math.max(2, Math.floor((rowWidth + gap) / (notebookWidth + gap)));
}

function renderNotebooks() {
    notebookTiers.forEach((tier) => tier.replaceChildren());
    notebookBookcase.querySelectorAll(".shelf-sign").forEach((sign) => sign.remove());

    const capacity = getShelfCapacity();
    const starterItems = [
        ...defaultNotebooks.map((notebook) => createNotebookButton(notebook)),
        createAddNotebookButton()
    ];
    let cursor = 0;
    let customNotebookOnThirdShelf = false;

    starterItems.forEach((element) => {
        const tierIndex = Math.min(2, Math.floor(cursor / capacity));
        notebookTiers[tierIndex].append(element);
        cursor += 1;
    });

    if (capacity >= starterItems.length) {
        cursor = capacity;
    }

    customNotebooks.forEach((notebook) => {
        const tierIndex = Math.min(2, Math.floor(cursor / capacity));
        notebookTiers[tierIndex].append(createNotebookButton(notebook));
        customNotebookOnThirdShelf ||= tierIndex === 2;
        cursor += 1;
    });

    if (customNotebooks.length === 0 && capacity >= starterItems.length) {
        const decorationCount = Math.min(5, capacity);
        for (let index = 0; index < decorationCount; index += 1) {
            notebookTiers[1].append(createDecorativeBook(index));
        }
    }

    if (!customNotebookOnThirdShelf && capacity >= starterItems.length) {
        notebookTiers[2].closest(".notebook-tier").append(createShelfSign());
    }
}

function setBookStatus(message) {
    bookStatus.textContent = message;
}

function getCurrentPages() {
    return ensureNotebookPages(selectedNotebookId, spreadStart + 2);
}

function getPage(side) {
    return getCurrentPages()[spreadStart + (side === "right" ? 1 : 0)];
}

function countWords(value) {
    return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function updateWordCount(side) {
    const editor = pageEditors[side];
    const words = countWords(editor.body.value);
    editor.count.textContent = `${words} ${words === 1 ? "word" : "words"}`;
}

function setActiveSide(side) {
    activeSide = side;
    pageEditors.left.form.classList.toggle("is-active-page", side === "left");
    pageEditors.right.form.classList.toggle("is-active-page", side === "right");
    activePageLabel.textContent = isSinglePageMode()
        ? `Page ${spreadStart + 1} selected`
        : `${side === "left" ? "Left" : "Right"} page selected`;

    const page = getPage(side);
    colourSwatches.forEach((swatch) => {
        const isActive = swatch.dataset.ink === page.ink;
        swatch.classList.toggle("is-active", isActive);
        swatch.setAttribute("aria-pressed", String(isActive));
    });
}

function loadPage(side) {
    const editor = pageEditors[side];
    const pageIndex = spreadStart + (side === "right" ? 1 : 0);
    const page = getCurrentPages()[pageIndex];

    editor.title.value = page.title;
    editor.body.value = page.body;
    editor.number.textContent = `Page ${pageIndex + 1}`;
    editor.form.style.setProperty("--page-ink", page.ink || "#2f3237");
    updateWordCount(side);
}

function loadSpread() {
    const singlePage = isSinglePageMode();
    ensureNotebookPages(selectedNotebookId, spreadStart + (singlePage ? 1 : 2));
    loadPage("left");
    loadPage("right");
    previousSpreadButton.disabled = spreadStart === 0;
    mobilePreviousPageButton.disabled = spreadStart === 0;
    previousSpreadButton.textContent = "← Previous pages";
    nextSpreadButton.textContent = "Next pages →";
    mobileNextPageButton.textContent = "Next →";
    setActiveSide("left");
    setBookStatus("Saved automatically.");
}

function savePage(side, showMessage = false) {
    if (!selectedNotebookId) {
        return false;
    }

    const editor = pageEditors[side];
    const page = getPage(side);
    page.title = editor.title.value;
    page.body = editor.body.value;
    page.ink = editor.form.style.getPropertyValue("--page-ink") || "#2f3237";
    page.updatedAt = new Date().toISOString();

    const saved = saveStoredValue(PAGES_KEY, notebookPages);
    if (showMessage) {
        setBookStatus(saved ? "Both pages are saved." : "Keep a downloaded copy of this page.");
    }
    return saved;
}

function saveSpread(showMessage = false) {
    savePage("left", false);
    savePage("right", false);
    if (showMessage) {
        setBookStatus("Both pages are saved.");
    }
}

function calculateBookStart(button) {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - window.innerWidth / 2;
    const y = rect.top + rect.height / 2 - window.innerHeight / 2;
    openBook.style.setProperty("--book-start-x", `${x}px`);
    openBook.style.setProperty("--book-start-y", `${y}px`);
}

function openNotebook(notebookId, button) {
    const notebook = getNotebook(notebookId);
    if (!notebook) {
        return;
    }

    window.clearTimeout(closeTimer);
    selectedNotebookId = notebookId;
    spreadStart = 0;
    sourceBookButton = button;
    calculateBookStart(button);
    ensureNotebookPages(notebookId, 2);

    openNotebookTitle.textContent = notebook.name;
    deleteNotebookButton.hidden = defaultNotebooks.some((item) => item.id === notebookId);
    deleteConfirmation.hidden = true;
    bookOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    sourceBookButton.classList.add("is-away");
    bookOverlay.classList.remove("is-closing");
    bookOverlay.classList.add("is-opening");
    loadSpread();

    closeTimer = window.setTimeout(() => {
        bookOverlay.classList.remove("is-opening");
        pageEditors.left.title.focus();
    }, 700);
}

function finishClosingBook() {
    bookOverlay.hidden = true;
    bookOverlay.classList.remove("is-closing", "is-opening");
    document.body.style.overflow = "";

    if (sourceBookButton) {
        sourceBookButton.classList.remove("is-away");
        sourceBookButton.focus();
    }

    selectedNotebookId = null;
    spreadStart = 0;
    sourceBookButton = null;
    renderNotebooks();
}

function closeNotebook({ save = true } = {}) {
    if (bookOverlay.hidden) {
        return;
    }

    if (save) {
        saveSpread();
    }
    deleteConfirmation.hidden = true;
    bookOverlay.classList.remove("is-opening");
    bookOverlay.classList.add("is-closing");
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(finishClosingBook, 540);
}

function fillTurningFace(prefix, page, pageIndex) {
    const number = prefix === "front" ? turningFrontNumber : turningBackNumber;
    const title = prefix === "front" ? turningFrontTitle : turningBackTitle;
    const preview = prefix === "front" ? turningFrontPreview : turningBackPreview;
    number.textContent = `Page ${pageIndex + 1}`;
    title.textContent = page.title || "Untitled page";
    preview.textContent = page.body.slice(0, 180) || "A clean page waiting for the next idea.";
}

function turnSpread(direction) {
    if (pageTurnLocked) {
        return;
    }

    saveSpread();
    const isForward = direction === "forward";
    const singlePage = isSinglePageMode();
    const pageStep = singlePage ? 1 : 2;
    const targetStart = isForward ? spreadStart + pageStep : spreadStart - pageStep;
    if (targetStart < 0) {
        return;
    }

    ensureNotebookPages(selectedNotebookId, targetStart + (singlePage ? 1 : 2));
    const pages = notebookPages[selectedNotebookId];
    const frontIndex = singlePage
        ? spreadStart
        : (isForward ? spreadStart + 1 : spreadStart);
    const backIndex = singlePage
        ? targetStart
        : (isForward ? targetStart : targetStart + 1);
    fillTurningFace("front", pages[frontIndex], frontIndex);
    fillTurningFace("back", pages[backIndex], backIndex);

    pageTurnLocked = true;
    turningSheet.hidden = false;
    turningSheet.className = "turning-sheet";
    void turningSheet.offsetWidth;
    turningSheet.classList.add(isForward ? "flip-forward" : "flip-backward");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const turnDuration = reducedMotion ? 0 : 850;

    window.setTimeout(() => {
        spreadStart = targetStart;
        loadSpread();
    }, reducedMotion ? 0 : 430);

    window.setTimeout(() => {
        turningSheet.hidden = true;
        turningSheet.className = "turning-sheet";
        pageTurnLocked = false;
        pageEditors[singlePage ? "left" : (isForward ? "right" : "left")].title.focus();
    }, turnDuration + 10);
}

notebookBookcase.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-action='add-notebook']");
    const notebookButton = event.target.closest("[data-notebook]");

    if (addButton) {
        addNotebookForm.reset();
        addNotebookDialog.showModal();
        newNotebookName.focus();
    } else if (notebookButton) {
        openNotebook(notebookButton.dataset.notebook, notebookButton);
    }
});

addNotebookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = newNotebookName.value.trim();
    const duplicate = getAllNotebooks().some((notebook) => notebook.name.toLowerCase() === name.toLowerCase());

    if (duplicate) {
        newNotebookName.setCustomValidity("A notebook with this name already exists.");
        newNotebookName.reportValidity();
        return;
    }

    const formData = new FormData(addNotebookForm);
    const notebook = {
        id: createId("custom"),
        name,
        lineOne: name,
        lineTwo: "Notebook",
        color: formData.get("cover-colour") || "custom-0"
    };

    customNotebooks.push(notebook);
    saveStoredValue(NOTEBOOKS_KEY, customNotebooks);
    ensureNotebookPages(notebook.id, 2);
    addNotebookDialog.close();
    renderNotebooks();
    const newButton = notebookBookcase.querySelector(`[data-notebook="${notebook.id}"]`);
    openNotebook(notebook.id, newButton);
});

newNotebookName.addEventListener("input", () => newNotebookName.setCustomValidity(""));
cancelNotebookButton.addEventListener("click", () => addNotebookDialog.close());
addNotebookDialog.addEventListener("click", (event) => {
    if (event.target === addNotebookDialog) {
        addNotebookDialog.close();
    }
});

Object.entries(pageEditors).forEach(([side, editor]) => {
    editor.form.addEventListener("focusin", () => setActiveSide(side));
    editor.form.addEventListener("pointerdown", () => setActiveSide(side));
    editor.form.addEventListener("submit", (event) => event.preventDefault());

    [editor.title, editor.body].forEach((field) => {
        field.addEventListener("input", () => {
            savePage(side);
            updateWordCount(side);
            setBookStatus("Saved automatically.");
        });
    });
});

colourSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
        const page = getPage(activeSide);
        page.ink = swatch.dataset.ink;
        pageEditors[activeSide].form.style.setProperty("--page-ink", page.ink);
        savePage(activeSide);
        setActiveSide(activeSide);
        setBookStatus("Pen colour changed.");
        pageEditors[activeSide].body.focus();
    });
});

previousSpreadButton.addEventListener("click", () => turnSpread("backward"));
nextSpreadButton.addEventListener("click", () => turnSpread("forward"));
mobilePreviousPageButton.addEventListener("click", () => turnSpread("backward"));
mobileNextPageButton.addEventListener("click", () => turnSpread("forward"));

copyActivePageButton.addEventListener("click", async () => {
    const editor = pageEditors[activeSide];
    const text = `${editor.title.value.trim()}\n\n${editor.body.value.trim()}`.trim();
    if (!text) {
        setBookStatus("There is no text to copy yet.");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setBookStatus("Selected page copied.");
    } catch (error) {
        setBookStatus("Copy was blocked. Select the text and copy it manually.");
    }
});

downloadActivePageButton.addEventListener("click", () => {
    const notebook = getNotebook(selectedNotebookId);
    const editor = pageEditors[activeSide];
    const pageIndex = spreadStart + (activeSide === "right" ? 1 : 0);
    const title = editor.title.value.trim() || `Page ${pageIndex + 1}`;
    const content = `${title}\n${notebook.name} · Page ${pageIndex + 1}\n\n${editor.body.value.trim()}`;
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");
    const safeTitle = title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
    downloadLink.href = fileUrl;
    downloadLink.download = `${safeTitle || "notebook-page"}.txt`;
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(fileUrl);
    setBookStatus("Selected page downloaded.");
});

closeBookButton.addEventListener("click", closeNotebook);
bookOverlay.addEventListener("click", (event) => {
    if (event.target === bookOverlay) {
        closeNotebook();
    }
});

deleteNotebookButton.addEventListener("click", () => {
    deleteConfirmation.hidden = false;
    cancelDeleteButton.focus();
});
cancelDeleteButton.addEventListener("click", () => {
    deleteConfirmation.hidden = true;
    deleteNotebookButton.focus();
});
confirmDeleteButton.addEventListener("click", () => {
    const notebookId = selectedNotebookId;
    if (defaultNotebooks.some((notebook) => notebook.id === notebookId)) {
        return;
    }

    customNotebooks = customNotebooks.filter((notebook) => notebook.id !== notebookId);
    delete notebookPages[notebookId];
    saveStoredValue(NOTEBOOKS_KEY, customNotebooks);
    saveStoredValue(PAGES_KEY, notebookPages);
    deleteConfirmation.hidden = true;
    closeNotebook({ save: false });
});

window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
        if (bookOverlay.hidden) {
            renderNotebooks();
        } else {
            if (!isSinglePageMode() && spreadStart % 2 !== 0) {
                spreadStart -= 1;
            }
            loadSpread();
        }
    }, 140);
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    if (!deleteConfirmation.hidden) {
        deleteConfirmation.hidden = true;
        deleteNotebookButton.focus();
    } else if (!bookOverlay.hidden) {
        closeNotebook();
    } else if (addNotebookDialog.open) {
        addNotebookDialog.close();
    }
});

migrateLegacyNotes();
renderNotebooks();
