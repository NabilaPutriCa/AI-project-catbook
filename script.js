// ===== SISTEM MEMORY CERDAS =====
let chatMemory = {
    userName: null,
    userMood: 'netral',
    currentTopic: null,
    conversationHistory: [],
    lastBooksDiscussed: [],
    userPreferences: {
        bookGenres: [],
        hobbies: [],
        readingLevel: null
    },
    context: []
};

let messageCount = 0;
let isTyping = false;

// ===== DATABASE LENGKAP =====
const knowledgeBase = {
    books: {
        fantasy: [
            { title: "Harry Potter Series", author: "J.K. Rowling", rating: 4.8, description: "Petualangan penyihir muda di sekolah sihir Hogwarts.", whyRead: "Dunia magis yang immersive, karakter yang berkembang, tema persahabatan dan keberanian." },
            { title: "The Hobbit", author: "J.R.R. Tolkien", rating: 4.7, description: "Bilbo Baggins diajak petualangan oleh kurcaci dan penyihir.", whyRead: "Klasik fantasi, petualangan epik, dasar dari genre modern fantasy." },
            { title: "The Chronicles of Narnia", author: "C.S. Lewis", rating: 4.6, description: "Anak-anak menemukan dunia Narnia melalui lemari pakaian.", whyRead: "Allegori Kristen yang indah, petualangan seru untuk semua usia." }
        ],
        horror: [
            { title: "World War Z", author: "Max Brooks", rating: 4.4, description: "Kisah wabah zombie global dalam format wawancara.", whyRead: "Realistic zombie apocalypse, format unik, well-researched." },
            { title: "The Shining", author: "Stephen King", rating: 4.7, description: "Keluarga menjadi penjaga hotel terpencil yang berhantu.", whyRead: "Horor psikologis masterpiece, tension building yang brilliant." },
            { title: "Dracula", author: "Bram Stoker", rating: 4.6, description: "Kisah vampir klasik Count Dracula.", whyRead: "Foundasi genre vampire, Gothic horror terbaik." }
        ],
        romance: [
            { title: "Pride and Prejudice", author: "Jane Austen", rating: 4.8, description: "Kisah cinta Elizabeth Bennet dan Mr. Darcy.", whyRead: "Klasik romance, kritik sosial tajam, karakter nuanced." },
            { title: "The Notebook", author: "Nicholas Sparks", rating: 4.5, description: "Kisah cinta Noah dan Allie yang diuji waktu.", whyRead: "Romance emotional, cerita yang menyentuh hati." }
        ],
        scifi: [
            { title: "Dune", author: "Frank Herbert", rating: 4.8, description: "Pertarungan politik di planet gurun Arrakis.", whyRead: "Epic sci-fi, world-building kompleks, tema ekologi dan agama." },
            { title: "1984", author: "George Orwell", rating: 4.7, description: "Distopia totaliter di bawah pengawasan Big Brother.", whyRead: "Kritik sosial mendalam, relevan hingga sekarang." }
        ],
        nonfiction: [
            { title: "Atomic Habits", author: "James Clear", rating: 4.7, description: "Panduan membangun kebiasaan baik.", whyRead: "Praktis, aplikatif, bisa ubah hidup sehari-hari." },
            { title: "Sapiens", author: "Yuval Noah Harari", rating: 4.8, description: "Sejarah spesies manusia dari Zaman Batu.", whyRead: "Perspektif baru tentang manusia, ditulis dengan engaging." }
        ]
    },
    
    generalKnowledge: {
        movies: [
            "Marvel Cinematic Universe (MCU) dimulai dari Iron Man (2008)",
            "Film dengan pendapatan tertinggi: Avatar (2009)",
            "The Lord of the Rings: Return of the King memenangkan 11 Oscar",
            "Studio Ghibli terkenal dengan film animasi seperti Spirited Away"
        ],
        music: [
            "The Beatles adalah band paling berpengaruh dalam sejarah musik pop",
            "K-pop telah menjadi fenomena global dengan grup seperti BTS",
            "Musik klasik era Baroque dipelopori oleh Bach dan Vivaldi",
            "Genre jazz berasal dari komunitas Afrika-Amerika di New Orleans"
        ],
        technology: [
            "AI (Artificial Intelligence) sedang berkembang pesat dalam berbagai bidang",
            "Blockchain adalah teknologi di balik cryptocurrency seperti Bitcoin",
            "Machine learning memungkinkan komputer belajar dari data",
            "Metaverse adalah konsep dunia virtual yang immersive"
        ],
        lifestyle: [
            "Meditasi dapat mengurangi stress dan meningkatkan fokus",
            "Olahraga teratur penting untuk kesehatan fisik dan mental",
            "Mindful eating membantu menikmati makanan dan menjaga pola makan sehat",
            "Quality sleep adalah kunci produktivitas dan kesehatan"
        ],
        randomFacts: [
            "Lebah madu harus mengunjungi 2 juta bunga untuk membuat 500g madu",
            "Coklat berasal dari biji kakao yang difermentasi dan dipanggang",
            "Otak manusia terdiri dari sekitar 86 miliar neuron",
            "Bahasa tertua yang masih digunakan adalah Tamil (lebih dari 5000 tahun)"
        ]
    },
    
    conversationTopics: {
        books: "📚 Buku & Literasi",
        movies: "🎬 Film & Entertainment", 
        music: "🎵 Musik & Seni",
        games: "🎮 Games & Hobi",
        tech: "💻 Teknologi & AI",
        life: "🌟 Lifestyle & Tips",
        random: "💭 Ngobrol Random"
    }
};

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    showWelcomeMessage();
    
    setTimeout(() => {
        document.getElementById('userInput').focus();
    }, 500);
});

function setupEventListeners() {
    const textarea = document.getElementById('userInput');
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });
    
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isTyping) sendMessage();
        }
    });
    
    document.querySelector('.cat-btn').addEventListener('click', function() {
        if (!isTyping) sendMessage();
    });
}

function showWelcomeMessage() {
    setTimeout(() => {
        addAIMessage(`😸 <strong>Halo! Saya Kitty AI - Asisten Lengkap Anda</strong><br><br>
            
            <strong>✨ APA YANG BISA SAYA LAKUKAN:</strong><br>
            📚 <strong>REKOMENDASI BUKU</strong> - Genre apapun, sesuai mood kamu<br>
            🎬 <strong>BAHAS FILM/MUSIK</strong> - Ngobrol seru tentang entertainment<br>
            💡 <strong>TIPS & SARAN</strong> - Lifestyle, belajar, produktivitas<br>
            🎮 <strong>DISKUSI HOBI</strong> - Games, teknologi, atau apapun!<br>
            💬 <strong>NGOBROL RANDOM</strong> - Kayak chat sama temen!<br><br>
            
            <strong>🎯 CONTOH PERTANYAAN:</strong><br>
            • "Rekomendasi buku fantasy terbaik"<br>
            • "Bagaimana cara mulai baca buku?"<br>
            • "Ada saran film yang bagus?"<br>
            • "Cerita tentang teknologi AI"<br>
            • Atau ngobrol apapun yang kamu mau!`);
    }, 1000);
}

// ===== FUNGSI UTAMA =====
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    addUserMessage(message);
    
    // Update memory
    chatMemory.conversationHistory.push({
        role: 'user',
        content: message,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    input.value = '';
    input.style.height = 'auto';
    
    messageCount++;
    updateStats();
    
    isTyping = true;
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateSmartResponse(message);
        addAIMessage(response);
        
        chatMemory.conversationHistory.push({
            role: 'ai',
            content: response,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        });
        
        scrollToBottom();
        isTyping = false;
    }, 800 + Math.random() * 700);
}

// ===== AI RESPONSE GENERATOR =====
function generateSmartResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Update context
    updateConversationContext(input);
    
    // ANALYZE USER INTENT
    const intent = analyzeIntent(input);
    
    // ROUTE TO APPROPRIATE HANDLER
    switch(intent.category) {
        case 'greeting':
            return handleGreeting(input);
        case 'farewell':
            return handleFarewell();
        case 'thanks':
            return handleThanks();
        case 'self_intro':
            return handleSelfIntroduction();
        case 'book_recommendation':
            return handleBookRecommendation(input, intent);
        case 'book_inquiry':
            return handleBookInquiry(input, intent);
        case 'entertainment':
            return handleEntertainment(input, intent);
        case 'learning_advice':
            return handleLearningAdvice(input);
        case 'life_advice':
            return handleLifeAdvice(input);
        case 'tech_discussion':
            return handleTechDiscussion(input);
        case 'hobby_discussion':
            return handleHobbyDiscussion(input);
        case 'personal_question':
            return handlePersonalQuestion(input);
        case 'fun_fact':
            return handleFunFact();
        case 'comparison':
            return handleComparison(input);
        case 'clarification':
            return handleClarification();
        case 'small_talk':
            return handleSmallTalk(input);
        case 'mood_based':
            return handleMoodBased(input);
        default:
            return handleGeneralConversation(input);
    }
}

// ===== INTENT ANALYZER =====
function analyzeIntent(input) {
    const intents = [
        {
            category: 'greeting',
            keywords: ['halo', 'hai', 'hi', 'hello', 'hey', 'pagi', 'siang', 'malam', 'selamat'],
            priority: 10
        },
        {
            category: 'farewell',
            keywords: ['bye', 'dadah', 'selamat tinggal', 'sampai jumpa', 'goodbye'],
            priority: 9
        },
        {
            category: 'thanks',
            keywords: ['terima kasih', 'thanks', 'thank you', 'makasih', 'thx'],
            priority: 8
        },
        {
            category: 'self_intro',
            keywords: ['kamu siapa', 'nama kamu', 'siapa namamu', 'perkenalkan'],
            priority: 7
        },
        {
            category: 'book_recommendation',
            keywords: ['rekomendasi buku', 'sarankan buku', 'buku bagus', 'novel bagus', 'bacaan'],
            priority: 6
        },
        {
            category: 'book_inquiry',
            keywords: ['tentang buku', 'sinopsis', 'review buku', 'buku apa', 'novel'],
            priority: 5
        },
        {
            category: 'entertainment',
            keywords: ['film', 'movie', 'musik', 'lagu', 'series', 'drakor', 'anime', 'game'],
            priority: 5
        },
        {
            category: 'learning_advice',
            keywords: ['belajar', 'kuliah', 'sekolah', 'tips belajar', 'cara belajar', 'motivasi belajar'],
            priority: 4
        },
        {
            category: 'life_advice',
            keywords: ['stress', 'capek', 'lelah', 'sedih', 'galau', 'bahagia', 'semangat', 'hidup', 'masalah'],
            priority: 4
        },
        {
            category: 'tech_discussion',
            keywords: ['teknologi', 'ai', 'robot', 'komputer', 'programming', 'coding', 'internet', 'digital'],
            priority: 4
        },
        {
            category: 'hobby_discussion',
            keywords: ['hobi', 'kesukaan', 'gemar', 'suka apa', 'kegiatan', 'waktu luang'],
            priority: 3
        },
        {
            category: 'fun_fact',
            keywords: ['fakta', 'tahukah kamu', 'menarik', 'unik', 'random fact'],
            priority: 3
        },
        {
            category: 'mood_based',
            keywords: ['lagi', 'sedang', 'mood', 'feeling', 'rasa'],
            priority: 2
        }
    ];
    
    let matchedIntents = [];
    
    for (const intent of intents) {
        for (const keyword of intent.keywords) {
            if (input.includes(keyword)) {
                matchedIntents.push({
                    category: intent.category,
                    priority: intent.priority,
                    matchedKeyword: keyword
                });
                break;
            }
        }
    }
    
    if (matchedIntents.length === 0) {
        // Check if it's a question
        if (input.includes('?') || input.startsWith('apa') || input.startsWith('bagaimana') || 
            input.startsWith('kenapa') || input.startsWith('mengapa') || input.startsWith('bisa')) {
            return { category: 'clarification', priority: 1 };
        }
        
        // Default to small talk
        return { category: 'small_talk', priority: 0 };
    }
    
    // Return highest priority intent
    matchedIntents.sort((a, b) => b.priority - a.priority);
    return matchedIntents[0];
}

// ===== HANDLERS =====
function handleGreeting(input) {
    const greetings = [
        `😸 <strong>Halo! Senang bertemu kamu!</strong><br><br>
         Ada yang bisa saya bantu hari ini? Mau ngobrol tentang apa?`,
        
        `🐱 <strong>Hi! Salam kenal ya!</strong><br><br>
         Saya Kitty AI, asisten yang bisa diajak ngobrol tentang banyak hal!<br>
         Mau bahas buku, film, teknologi, atau sekedar ngobrol ringan?`,
        
        `👋 <strong>Hello there!</strong><br><br>
         Hari ini mau diskusi apa nih? Saya siap menemani kamu ngobrol!`
    ];
    
    // Personalize jika sudah kenal
    if (chatMemory.userName) {
        return `😸 <strong>Halo ${chatMemory.userName}! Senang ketemu lagi!</strong><br><br>
                Terakhir kita ngobrol tentang ${chatMemory.currentTopic || 'berbagai hal'}.<br>
                Mau lanjutin atau bahas hal baru hari ini?`;
    }
    
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function handleSelfIntroduction() {
    return `🤖 <strong>Tentang Saya:</strong><br><br>
            Saya <strong>Kitty AI</strong> - asisten virtual yang dirancang untuk:<br><br>
            
            💬 <strong>NGOBROL NATURAL</strong><br>
            • Bisa paham konteks percakapan<br>
            • Ingat topik sebelumnya<br>
            • Responsif dan friendly<br><br>
            
            📚 <strong>PAKAR BUKU</strong><br>
            • Rekomendasi berdasarkan genre & mood<br>
            • Review dan sinopsis lengkap<br>
            • Tips membaca untuk pemula<br><br>
            
            🎯 <strong>MULTI-TALENTED</strong><br>
            • Diskusi film, musik, games<br>
            • Tips belajar & produktivitas<br>
            • Ngobrol random kayak temen<br><br>
            
            <em>Jadi, mau ngobrol apa hari ini? Bebas aja!</em>`;
}

function handleBookRecommendation(input, intent) {
    const genreMap = {
        'fantasi': 'fantasy',
        'fantasy': 'fantasy',
        'horror': 'horror', 
        'zombie': 'horror',
        'zombi': 'horror',
        'romantis': 'romance',
        'romance': 'romance',
        'sci-fi': 'scifi',
        'science fiction': 'scifi',
        'non-fiksi': 'nonfiction',
        'non fiksi': 'nonfiction',
        'self-help': 'nonfiction',
        'klasik': 'fantasy'
    };
    
    let targetGenre = null;
    
    // Cari genre dalam input
    for (const [indonesia, english] of Object.entries(genreMap)) {
        if (input.includes(indonesia)) {
            targetGenre = english;
            break;
        }
    }
    
    // Jika tidak ada genre spesifik
    if (!targetGenre) {
        chatMemory.context.push('awaiting_genre');
        
        return `📚 <strong>Mau rekomendasi buku ya? Perfect!</strong><br><br>
                
                <strong>GENRE YANG TERSEDIA:</strong><br>
                🧙 Fantasy - Dunia magis & petualangan epik<br>
                🧟 Horror - Cerita seram & thriller<br>
                💖 Romance - Kisah cinta & drama<br>
                🚀 Sci-Fi - Futuristik & teknologi<br>
                📖 Non-Fiction - Belajar & pengembangan diri<br><br>
                
                <strong>ATAU BERDASARKAN:</strong><br>
                • Mood kamu sekarang (sedih/senang/stres)<br>
                • Untuk pemula atau pembaca berpengalaman<br>
                • Panjang buku (pendek/panjang)<br><br>
                
                <em>Contoh: "Rekomendasi fantasy untuk pemula" atau "Buku buat lagi stres"</em>`;
    }
    
    // Jika ada genre spesifik
    const books = knowledgeBase.books[targetGenre];
    if (books && books.length > 0) {
        const selectedBooks = books.slice(0, 3);
        
        let response = `📚 <strong>Rekomendasi ${targetGenre} terbaik:</strong><br><br>`;
        
        selectedBooks.forEach((book, index) => {
            response += `<strong>${index + 1}. ${book.title}</strong><br>`;
            response += `   ✍️ oleh ${book.author}<br>`;
            response += `   ⭐ ${book.rating}/5.0<br>`;
            response += `   📖 ${book.description}<br>`;
            response += `   💡 <em>Kenapa baca ini:</em> ${book.whyRead}<br><br>`;
        });
        
        response += `🎯 <strong>REKOMENDASI UTAMA:</strong> ${selectedBooks[0].title}<br><br>`;
        response += `Mau detail lebih lanjut tentang salah satu buku di atas?<br>
                     Atau cari rekomendasi berdasarkan kriteria lain?`;
        
        return response;
    }
    
    return `📚 <strong>Genre ${targetGenre}</strong><br><br>
            Waduh, sepertinya saya belum punya banyak data tentang genre ini.<br><br>
            Tapi saya bisa bantu cari buku dengan genre lain yang seru!<br>
            Atau mau coba genre <strong>Fantasy</strong> atau <strong>Sci-Fi</strong>?`;
}

function handleEntertainment(input, intent) {
    if (input.includes('film') || input.includes('movie') || input.includes('sinetron') || input.includes('drakor')) {
        return `🎬 <strong>Wah, mau bahas film ya!</strong><br><br>
                
                <strong>REKOMENDASI FILM BAGUS:</strong><br>
                🏆 <strong>The Lord of the Rings Trilogy</strong> - Fantasy epic terbaik sepanjang masa<br>
                🧠 <strong>Inception</strong> - Sci-fi mind-bending yang brilliant<br>
                🎭 <strong>Parasite</strong> - Thriller sosial yang memenangkan Oscar<br>
                ❤️ <strong>The Shawshank Redemption</strong> - Drama tentang harapan dan persahabatan<br><br>
                
                <strong>GENRE LAIN:</strong><br>
                • Horror: The Conjuring, Hereditary<br>
                • Romance: The Notebook, La La Land<br>
                • Action: John Wick, Mission Impossible<br>
                • Anime: Spirited Away, Your Name<br><br>
                
                Mau rekomendasi spesifik berdasarkan genre? Atau bahas film tertentu?`;
    }
    
    if (input.includes('musik') || input.includes('lagu') || input.includes('spotify') || input.includes('playlist')) {
        return `🎵 <strong>Musik! Suka banget nih!</strong><br><br>
                
                <strong>REKOMENDASI MUSIK:</strong><br>
                🎧 <strong>Untuk fokus belajar/kerja:</strong> Lo-fi beats, Classical, Instrumental<br>
                🎉 <strong>Untuk mood booster:</strong> Pop, Dance, K-pop<br>
                😌 <strong>Untuk relax:</strong> Jazz, Acoustic, Ambient<br>
                🎸 <strong>Classic hits:</strong> The Beatles, Queen, Michael Jackson<br><br>
                
                <strong>TIPS:</strong><br>
                • Musik instrumental membantu konsentrasi<br>
                • Buat playlist untuk mood tertentu<br>
                • Explore genre baru untuk pengalaman fresh<br><br>
                
                Genre musik apa yang paling kamu suka?`;
    }
    
    if (input.includes('game') || input.includes('games') || input.includes('main game') || input.includes('steam')) {
        return `🎮 <strong>Gamer ya? Nice!</strong><br><br>
                
                <strong>REKOMENDASI GAMES:</strong><br>
                🎲 <strong>Story-rich:</strong> The Last of Us, Red Dead Redemption 2<br>
                🧠 <strong>Puzzle/strategi:</strong> Portal 2, Civilization VI<br>
                🏆 <strong>Multiplayer seru:</strong> Among Us, Valorant, Minecraft<br>
                🎯 <strong>Indie gems:</strong> Stardew Valley, Hades, Celeste<br><br>
                
                <strong>GENRE FAVORIT SAYA:</strong><br>
                • RPG dengan cerita mendalam<br>
                • Puzzle games yang challenging<br>
                • Co-op games buat main sama temen<br><br>
                
                Kamu biasanya main game genre apa?`;
    }
    
    return `🎭 <strong>Entertainment itu penting buat refresh mind!</strong><br><br>
            Mau bahas film, musik, games, atau series favorit kamu?<br>
            Atau butuh rekomendasi hiburan untuk weekend ini?`;
}

function handleLearningAdvice(input) {
    if (input.includes('belajar') || input.includes('kuliah') || input.includes('sekolah')) {
        return `📖 <strong>Tips Belajar Efektif:</strong><br><br>
                
                <strong>1. POMODORO TECHNIQUE</strong><br>
                • Belajar 25 menit, istirahat 5 menit<br>
                • Setelah 4 cycle, istirahat panjang 15-30 menit<br>
                • Gunakan timer atau aplikasi Pomodoro<br><br>
                
                <strong>2. ACTIVE RECALL</strong><br>
                • Jangan cuma baca, tapi coba recall informasi<br>
                • Buat pertanyaan untuk diri sendiri<br>
                • Ajarkan konsep ke orang lain (real atau imajiner)<br><br>
                
                <strong>3. SPACED REPETITION</strong><br>
                • Review materi secara berkala<br>
                • Interval: 1 hari, 3 hari, 1 minggu, 1 bulan<br>
                • Gunakan flashcard atau aplikasi seperti Anki<br><br>
                
                <strong>4. ENVIRONMENT MATTERS</strong><br>
                • Cari tempat tenang dan nyaman<br>
                • Matikan notifikasi gadget<br>
                • Siapkan air minum dan snack sehat<br><br>
                
                <em>Mau tips spesifik untuk mata pelajaran tertentu?</em>`;
    }
    
    if (input.includes('motivasi') || input.includes('malas') || input.includes('tidak semangat')) {
        return `💪 <strong>Tips Motivasi Belajar:</strong><br><br>
                
                <strong>1. START SMALL</strong><br>
                • Target 5-10 menit dulu<br>
                • "Just show up" - datang aja dulu ke meja belajar<br>
                • Momentum akan terbangun dengan sendirinya<br><br>
                
                <strong>2. FIND YOUR "WHY"</strong><br>
                • Kenapa kamu perlu belajar ini?<br>
                • Apa tujuan jangka panjangnya?<br>
                • Visualisasikan hasil yang ingin dicapai<br><br>
                
                <strong>3. REWARD SYSTEM</strong><br>
                • Setelah belajar X menit, reward diri sendiri<br>
                • Reward kecil: snack favorit, episode series<br>
                • Reward besar: jalan-jalan, beli sesuatu<br><br>
                
                <strong>4. ACCOUNTABILITY PARTNER</strong><br>
                • Cari teman belajar<br>
                • Lapor progress ke seseorang<br>
                • Join study group atau community<br><br>
                
                <em>Semangat ya! Progress kecil tetap progress!</em>`;
    }
    
    return `🎓 <strong>Belajar itu journey, bukan destination!</strong><br><br>
            Butuh tips spesifik tentang:<br>
            • Cara menghafal dengan efektif?<br>
            • Mengatasi demotivasi?<br>
            • Manajemen waktu belajar?<br>
            • Atau persiapan ujian?`;
}

function handleLifeAdvice(input) {
    if (input.includes('stress') || input.includes('stres') || input.includes('tekanan') || input.includes('capek')) {
        return `😌 <strong>Tips Mengatasi Stress:</strong><br><br>
                
                <strong>1. BREATHE DEEPLY</strong><br>
                • Tarik napas 4 detik, tahan 7 detik, buang 8 detik<br>
                • Ulangi 5-10 kali<br>
                • Bisa dilakukan dimana saja<br><br>
                
                <strong>2. MOVE YOUR BODY</strong><br>
                • Stretching ringan 5-10 menit<br>
                • Jalan-jalan di sekitar rumah<br>
                • Yoga atau exercise ringan<br><br>
                
                <strong>3. DIGITAL DETOX</strong><br>
                • Matikan notifikasi 1-2 jam<br>
                • Batasi social media scrolling<br>
                • Quality time tanpa gadget<br><br>
                
                <strong>4. GRATITUDE JOURNAL</strong><br>
                • Tulis 3 hal yang disyukuri hari ini<br>
                • Fokus pada hal positif<br>
                • Shift perspective<br><br>
                
                <em>Remember: This too shall pass. Kamu kuat!</em>`;
    }
    
    if (input.includes('bahagia') || input.includes('senang') || input.includes('happy')) {
        return `😊 <strong>Tips Menjaga Kebahagiaan:</strong><br><br>
                
                <strong>1. DAILY SMALL WINS</strong><br>
                • Rayakan pencapaian kecil<br>
                • Selesaikan satu task yang tertunda<br>
                • Buat to-do list yang realistic<br><br>
                
                <strong>2. CONNECT WITH OTHERS</strong><br>
                • Chat/call teman atau keluarga<br>
                • Quality conversation, bukan small talk<br>
                • Berbagi cerita dan perasaan<br><br>
                
                <strong>3. DO THINGS YOU LOVE</strong><br>
                • Luangkan waktu untuk hobi<br>
                • Coba aktivitas baru<br>
                • Revisit childhood joys<br><br>
                
                <strong>4. HELP OTHERS</strong><br>
                • Small acts of kindness<br>
                • Volunteer jika memungkinkan<br>
                • Senyum dan sapa orang lain<br><br>
                
                <em>Happiness is often found in the simplest things!</em>`;
    }
    
    return `🌟 <strong>Life is a journey with ups and downs!</strong><br><br>
            Butuh saran tentang:<br>
            • Mengelola emosi?<br>
            • Mencari passion/hobi?<br>
            • Improvement diri?<br>
            • Atau sekedar butuh teman bicara?<br><br>
            <em>Saya di sini untuk mendengarkan dan membantu!</em>`;
}

function handleTechDiscussion(input) {
    return `💻 <strong>Teknologi & AI</strong><br><br>
            
            <strong>TREND TEKNOLOGI SEKARANG:</strong><br>
            🤖 <strong>AI & Machine Learning</strong> - ChatGPT, DALL-E, autonomous systems<br>
            🌐 <strong>Web3 & Blockchain</strong> - Cryptocurrency, NFTs, decentralized apps<br>
            🕶️ <strong>AR/VR & Metaverse</strong> - Immersive experiences, virtual worlds<br>
            📱 <strong>Mobile Tech</strong> - Foldable phones, 5G, app development<br><br>
            
            <strong>TENTANG AI (KAYAK SAYA):</strong><br>
            • AI modern menggunakan <strong>deep learning</strong> dan neural networks<br>
            • Training data yang besar membuat AI semakin pintar<br>
            • Ethical considerations penting dalam pengembangan AI<br>
            • Masa depan: AI assistants akan semakin integrated dalam kehidupan<br><br>
            
            <strong>BUAT YANG MAU BELAJAR TECH:</strong><br>
            • Mulai dari fundamental: logic, algorithms, basic programming<br>
            • Online resources: freeCodeCamp, Coursera, YouTube tutorials<br>
            • Practice dengan project kecil-kecilan<br>
            • Join tech communities untuk belajar bersama<br><br>
            
            Tertarik bahas topik tech tertentu? Atau mau tanya tentang AI?`;
}

function handleGeneralConversation(input) {
    // Coba pahami dari konteks percakapan sebelumnya
    const lastFewMessages = chatMemory.conversationHistory.slice(-4);
    const lastTopics = lastFewMessages.map(msg => msg.content.toLowerCase());
    
    // Jika ada pattern tertentu
    if (lastTopics.some(topic => topic.includes('buku') || topic.includes('membaca'))) {
        return `📚 <strong>Kita lagi ngobrolin buku ya?</strong><br><br>
                Mau lanjutin bahas:<br>
                • Rekomendasi buku spesifik?<br>
                • Tips membaca yang efektif?<br>
                • Atau bahas penulis favorit?<br><br>
                <em>Atau mau ganti topik juga gapapa!</em>`;
    }
    
    if (lastTopics.some(topic => topic.includes('film') || topic.includes('nonton'))) {
        return `🎬 <strong>Masih penasaran sama film ya?</strong><br><br>
                Mau saya kasih:<br>
                • Rekomendasi berdasarkan genre?<br>
                • Review film tertentu?<br>
                • Atau bahas series yang lagi trending?<br><br>
                <em>Atau mau bahas topik lain?</em>`;
    }
    
    // Respons general yang engaging
    const responses = [
        `🤔 <strong>Menarik ya topiknya!</strong><br><br>
         Sebagai AI, saya excited bisa ngobrol berbagai hal dengan kamu.<br>
         Mau bahas lebih dalam tentang ini, atau ganti topik lain?`,
        
        `💭 <strong>Wah, pembicaraan yang seru nih!</strong><br><br>
         Saya suka banget bisa diskusi berbagai topik seperti ini.<br>
         Ada hal spesifik yang mau kamu explore lebih jauh?`,
        
        `😊 <strong>Conversation is the spice of life!</strong><br><br>
         Ngobrol dengan kamu itu menyenangkan!<br>
         Mau lanjutin topik ini atau coba bahas hal baru?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleSmallTalk(input) {
    const responses = [
        `😊 <strong>Hari ini gimana?</strong> Ada hal menarik yang terjadi?<br><br>
         Atau mau cerita tentang aktivitas kamu hari ini?`,
        
        `🎯 <strong>Apa rencana kamu hari ini?</strong> Mau produktif atau chill aja?<br><br>
         Kadang balance antara work dan rest itu penting banget!`,
        
        `🌟 <strong>Ngobrol ringan ya? Suka banget!</strong><br><br>
         Kadang obrolan santai justru yang paling bermakna.<br>
         Ada cerita menarik atau pengalaman baru akhir-akhir ini?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleMoodBased(input) {
    if (input.includes('sedih') || input.includes('galau') || input.includes('down') || input.includes('bad mood')) {
        return `😿 <strong>Aw, semangat ya!</strong> Bad days happen to everyone.<br><br>
                
                <strong>IDE UNTUK MOOD BOOST:</strong><br>
                🎵 Putar lagu favorit kamu dan dance like nobody's watching<br>
                🍫 Nikmati makanan/minuman favorit (in moderation!)<br>
                🎬 Nonton film/series comedy atau feel-good<br>
                📞 Chat/call seseorang yang bikin kamu senyum<br>
                🎨 Coba aktivitas kreatif: drawing, writing, crafting<br><br>
                
                <strong>ATAU...</strong><br>
                Mau cerita apa yang bikin kamu sedih? Saya di sini untuk mendengarkan.`;
    }
    
    if (input.includes('senang') || input.includes('happy') || input.includes('good mood') || input.includes('bahagia')) {
        return `🎉 <strong>Wah, senang dengar kamu lagi happy!</strong><br><br>
                
                <strong>IDE UNTUK MANFAATKAN ENERGI POSITIF:</strong><br>
                ✨ Coba sesuatu yang baru atau challenging<br>
                🎯 Selesaikan task yang udah ditunda-tunda<br>
                🤗 Spread the positivity - bikin orang lain senang juga<br>
                📝 Tuliskan apa yang bikin kamu happy hari ini (buat diingat later)<br>
                🎁 Treat yourself dengan sesuatu special<br><br>
                
                <em>Positive vibes are contagious! Keep it up!</em>`;
    }
    
    if (input.includes('bosen') || input.includes('bosan') || input.includes('ga ada kerjaan') || input.includes('gabut')) {
        return `😴 <strong>Lagi bosen ya? Happens to the best of us!</strong><br><br>
                
                <strong>IDE ANTI-BOSEN:</strong><br>
                🎮 Coba game/aktivitas baru (online atau offline)<br>
                📚 Explore genre buku/film/musik yang belum pernah dicoba<br>
                🧠 Learn something new: skill, language, instrument<br>
                🏃 Coba workout/challenge fisik yang beda<br>
                🎨 Creative project: cook new recipe, DIY craft, photography<br><br>
                
                <strong>ATAU...</strong><br>
                Mau saya kasih rekomendasi spesifik berdasarkan minat kamu?`;
    }
    
    return `😊 <strong>Mood kamu gimana hari ini?</strong><br><br>
            Sedang senang, sedih, stress, excited, atau campur-campur?<br>
            Sharing aja, saya di sini untuk mendengarkan!`;
}

// ===== FUNGSI BANTUAN =====
function updateConversationContext(input) {
    // Deteksi dan update topic
    const topics = {
        'buku': 'books',
        'membaca': 'books',
        'novel': 'books',
        'film': 'movies',
        'nonton': 'movies',
        'musik': 'music',
        'lagu': 'music',
        'game': 'games',
        'main': 'games',
        'belajar': 'learning',
        'kuliah': 'learning',
        'teknologi': 'tech',
        'ai': 'tech',
        'robot': 'tech',
        'stress': 'life',
        'bahagia': 'life',
        'hidup': 'life'
    };
    
    for (const [keyword, topic] of Object.entries(topics)) {
        if (input.includes(keyword)) {
            chatMemory.currentTopic = topic;
            break;
        }
    }
    
    // Deteksi nama
    if (input.includes('nama saya') || input.includes('namaku') || input.includes('panggil aku')) {
        const nameMatch = input.match(/nama (saya|aku) (\w+)/i) || 
                         input.match(/panggil (aku|saya) (\w+)/i);
        if (nameMatch && nameMatch[2]) {
            chatMemory.userName = nameMatch[2];
        }
    }
}

function updateStats() {
    document.getElementById('messagesCount').textContent = messageCount;
}

// ===== FUNGSI UI =====
function addUserMessage(content) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
        <div class="message-header">
            <i class="fas fa-user"></i>
            <strong>Anda</strong>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <div class="message-content">
            <p>${escapeHtml(content)}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addAIMessage(content) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    messageDiv.innerHTML = `
        <div class="message-header">
            <i class="fas fa-cat"></i>
            <strong>Kitty AI</strong>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <div class="message-content">
            ${content}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.remove();
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== FUNGSI TAMBAHAN =====
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    const messages = chatMessages.querySelectorAll('.message:not(.welcome-message)');
    messages.forEach(msg => msg.remove());
    
    chatMemory = {
        userName: null,
        userMood: 'netral',
        currentTopic: null,
        conversationHistory: [],
        lastBooksDiscussed: [],
        userPreferences: {
            bookGenres: [],
            hobbies: [],
            readingLevel: null
        },
        context: []
    };
    
    messageCount = 0;
    updateStats();
    
    document.getElementById('userInput').focus();
    
    addAIMessage(`😸 <strong>Chat dibersihkan! Fresh start!</strong><br><br>
                  Mau ngobrol apa hari ini? Buku, film, musik, belajar, atau sekedar ngobrol ringan?<br>
                  <em>I'm all ears! Or should I say, all processors? 😼</em>`);
}

function showExamples() {
    const modal = document.getElementById('examplesModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('examplesModal');
    modal.style.display = 'none';
}

// Event listeners
document.addEventListener('click', function(event) {
    const modal = document.getElementById('examplesModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});