# -*- coding: utf-8 -*-
"""
PROYEK AI SEDERHANA: SISTEM REKOMENDASI FILM
Konsep: Content-Based Filtering (Filter Berdasarkan Konten)
Algoritma: Cosine Similarity (Mengukur Kemiripan)
"""

print("=" * 50)
print("SISTEM REKOMENDASI FILM AI SEDERHANA")
print("=" * 50)

# ==================== DATABASE FILM ====================
films = [
    {"judul": "Avengers: Endgame", "genre": "action superhero sci-fi", "rating": 4.8},
    {"judul": "The Conjuring", "genre": "horror thriller supernatural", "rating": 4.6},
    {"judul": "La La Land", "genre": "romance musical drama", "rating": 4.7},
    {"judul": "Parasite", "genre": "thriller drama dark-comedy", "rating": 4.9},
    {"judul": "Your Name", "genre": "anime romance fantasy", "rating": 4.8},
    {"judul": "John Wick", "genre": "action thriller crime", "rating": 4.5},
    {"judul": "The Notebook", "genre": "romance drama emotional", "rating": 4.4},
    {"judul": "Train to Busan", "genre": "horror action zombie", "rating": 4.7},
    {"judul": "Spirited Away", "genre": "anime fantasy adventure", "rating": 4.9},
    {"judul": "Mission Impossible", "genre": "action adventure spy", "rating": 4.6}
]

# ==================== TAMPILKAN DAFTAR FILM ====================
print("\n🎬 DAFTAR FILM YANG TERSEDIA:")
print("-" * 40)
for i, film in enumerate(films, 1):
    print(f"{i:2}. {film['judul']:25} | Genre: {film['genre']:30} | Rating: {film['rating']}")

# ==================== FUNGSI UTAMA AI ====================
def hitung_kemiripan(genre1, genre2):
    """Fungsi sederhana untuk menghitung kesamaan genre"""
    genre1_set = set(genre1.split())
    genre2_set = set(genre2.split())
    
    # Hitung berapa banyak genre yang sama
    kesamaan = len(genre1_set.intersection(genre2_set))
    total_unik = len(genre1_set.union(genre2_set))
    
    # Rumus cosine similarity sederhana
    if total_unik == 0:
        return 0
    return kesamaan / total_unik

def rekomendasi_film(film_yang_disuka):
    """Fungsi AI untuk memberikan rekomendasi"""
    print(f"\n🔍 MENCARI REKOMENDASI UNTUK: {film_yang_disuka}")
    print("-" * 50)
    
    # Cari film yang dipilih
    film_pilihan = None
    for film in films:
        if film["judul"].lower() == film_yang_disuka.lower():
            film_pilihan = film
            break
    
    if not film_pilihan:
        print("❌ Film tidak ditemukan dalam database!")
        return
    
    # Hitung skor kemiripan dengan semua film
    hasil_rekomendasi = []
    for film in films:
        if film["judul"] == film_pilihan["judul"]:
            continue  # Lewati film yang sama
        
        skor_kemiripan = hitung_kemiripan(film_pilihan["genre"], film["genre"])
        skor_final = skor_kemiripan * 0.7 + (film["rating"] / 5) * 0.3
        
        hasil_rekomendasi.append({
            "judul": film["judul"],
            "skor": skor_final,
            "genre": film["genre"],
            "rating": film["rating"]
        })
    
    # Urutkan dari skor tertinggi
    hasil_rekomendasi.sort(key=lambda x: x["skor"], reverse=True)
    
    # Tampilkan 3 rekomendasi terbaik
    print(f"📊 Berdasarkan genre '{film_pilihan['genre']}' dan rating:")
    print("=" * 50)
    
    for i, rec in enumerate(hasil_rekomendasi[:3], 1):
        print(f"\n{i}. 🎥 {rec['judul']}")
        print(f"   ⭐ Rating: {rec['rating']}/5.0")
        print(f"   🏷️  Genre: {rec['genre']}")
        print(f"   📈 Skor Rekomendasi: {rec['skor']:.2%}")

# ==================== PROGRAM UTAMA ====================
print("\n" + "=" * 50)
print("CARA MENGGUNAKAN:")
print("1. Lihat daftar film di atas")
print("2. Ketik judul film yang kamu suka (persis)")
print("3. Sistem AI akan beri rekomendasi")
print("=" * 50)

while True:
    # Input dari pengguna
    pilihan = input("\n🎯 Masukkan judul film favorit kamu: ").strip()
    
    # Berikan rekomendasi
    rekomendasi_film(pilihan)
    
    # Tanya apakah mau lanjut
    lanjut = input("\n🔄 Cari rekomendasi untuk film lain? (ya/tidak): ").lower()
    if lanjut != 'ya':
        print("\n" + "=" * 50)
        print("TERIMA KASIH TELAH MENGGUNAKAN SISTEM AI INI!")
        print("=" * 50)
        break