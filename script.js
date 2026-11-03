// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise 1 fullfilled");
//     }, 1000);
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise 2 fullfilled");
//     }, 4000);
// });

//         console.log('work 3');

// async function main() {
//     console.log('work 1');

//     const result1 = await promise1;
//     const result2 = await promise2;

//     console.log(result1);
//     console.log(result2);

//         console.log('work 2');

// }

//         console.log('work 4');

// main();

// async function getProducts(){
//     return new Promise ((resolve, rejact) => {

//         setTimeout(() => {
//             resolve("promise 1 products fulfilled");
//         }, 2000);
//     });
// };

// async function getUsers() {
//     return new Promise ((resolve, rejact) => {

//         setTimeout(() => {
//             resolve("promise 2 users fulfilled");
//         }, 2000);
//     });
// };

// async function getImages() {
//     return new Promise ((resolve, rejact) => {

//         setTimeout(() => {
//             resolve("promise 3 images fulfilled");
//         }, 2000);
//     });
// };


// async function handlePromises() {

//     const promies = await Promise.all([getProducts(), getUsers(), getImages()]);

//     console.log(promies[0]);
//     console.log(promies[1]);
//     console.log(promies[2]);

// }

// handlePromises();

const container = document.getElementById('users-container');
const statusText = document.getElementById('status');

// API'dan kelgan matnni HTML sifatida emas, oddiy matn sifatida chiqarish uchun.
// Aks holda ma'lumot ichidagi <script> yoki <img onerror> kabi kod sahifada ishga tushib ketishi mumkin.
function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

async function fetchUsers() {
    statusText.textContent = 'Yuklanmoqda...';
    try {
        const response = await fetch('https://dummyjson.com/users');

        if (!response.ok) {
            throw new Error(`Xatolik yuz berdi: ${response.status}`);
        }

        const data = await response.json();
        statusText.textContent = `${data.users.length} ta foydalanuvchi`;

        // Foydalanuvchilarni bitta HTML qatoriga yig'ib, ekranga birdaniga chiqaramiz:
        container.innerHTML = data.users.map((user) => `
            <article class="user-card">
                <img src="${escapeHtml(user.image)}" alt="" width="64" height="64" loading="lazy" />
                <div>
                    <h2>${escapeHtml(user.firstName)} ${escapeHtml(user.lastName)}</h2>
                    <p class="username">@${escapeHtml(user.username)}</p>
                    <p><a href="mailto:${escapeHtml(user.email)}">${escapeHtml(user.email)}</a></p>
                    <p>${escapeHtml(user.phone)}</p>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
        statusText.textContent = '';
        container.innerHTML = `
            <div class="error">
                <p>Maʼlumotlarni yuklab boʻlmadi.</p>
                <button type="button" id="retry">Qayta urinish</button>
            </div>`;
        document.getElementById('retry').addEventListener('click', fetchUsers);
    }
}

fetchUsers();
