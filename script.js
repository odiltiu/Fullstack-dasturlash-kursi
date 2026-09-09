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

async function fetchUsers() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        
        if (!response.ok) {
            throw new Error(`Xatolik yuz berdi: ${response.status}`);
        }

        const data = await response.json();

        // Foydalanuvchilarni bitta HTML qatoriga yig'ib, ekranga birdaniga chiqaramiz:
        container.innerHTML = data.users.map((user) => `
            <div class="user-card">
                <h2>${user.firstName}</h2>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <p>${user.username}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
        container.innerHTML = '<p>Maʼlumotlarni yuklab boʻlmadi.</p>';
    }
}

fetchUsers();