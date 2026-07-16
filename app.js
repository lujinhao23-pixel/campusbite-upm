// ===== Menu Data =====
const menuItems = [
    {
        id: 1, name: "Chicken Rice", price: 5.50, emoji: "🍛",
        vendor: "Cafeteria A", category: "cafeteria-a",
        tags: ["halal", "popular"], description: "Steamed chicken with fragrant rice"
    },
    {
        id: 2, name: "Nasi Lemak", price: 4.00, emoji: "🥘",
        vendor: "Cafeteria A", category: "cafeteria-a",
        tags: ["halal"], description: "Coconut rice with sambal & anchovies"
    },
    {
        id: 3, name: "Curry Mee", price: 4.50, emoji: "🍜",
        vendor: "Cafeteria B", category: "cafeteria-b",
        tags: ["halal", "spicy"], description: "Rich curry noodle soup"
    },
    {
        id: 4, name: "Beef Rendang", price: 6.50, emoji: "🥩",
        vendor: "Cafeteria B", category: "cafeteria-b",
        tags: ["halal", "spicy"], description: "Slow-cooked beef in coconut curry"
    },
    {
        id: 5, name: "Vegetable Fried Rice", price: 3.50, emoji: "🍚",
        vendor: "Cafeteria A", category: "cafeteria-a",
        tags: ["halal", "veg"], description: "Wok-fried rice with mixed vegetables"
    },
    {
        id: 6, name: "Iced Milo", price: 2.00, emoji: "🥤",
        vendor: "Snack & Drinks", category: "snack",
        tags: ["halal"], description: "Classic Malaysian iced chocolate malt"
    },
    {
        id: 7, name: "Roti Canai", price: 1.50, emoji: "🫓",
        vendor: "Cafeteria B", category: "cafeteria-b",
        tags: ["halal", "popular"], description: "Flaky flatbread with curry dip"
    },
    {
        id: 8, name: "Mee Goreng", price: 4.00, emoji: "🍝",
        vendor: "Cafeteria A", category: "cafeteria-a",
        tags: ["halal", "spicy"], description: "Stir-fried noodles with spices"
    },
    {
        id: 9, name: "Cendol", price: 3.00, emoji: "🧊",
        vendor: "Snack & Drinks", category: "snack",
        tags: ["halal"], description: "Green jelly noodles in coconut milk"
    },
    {
        id: 10, name: "Chicken Burger", price: 5.00, emoji: "🍔",
        vendor: "Snack & Drinks", category: "snack",
        tags: ["halal"], description: "Grilled chicken patty with fresh veggies"
    },
    {
        id: 11, name: "Tom Yam Soup", price: 5.00, emoji: "🍲",
        vendor: "Cafeteria B", category: "cafeteria-b",
        tags: ["halal", "spicy"], description: "Spicy & sour Thai-style soup"
    },
    {
        id: 12, name: "Kuih Lapis", price: 2.50, emoji: "🎂",
        vendor: "Snack & Drinks", category: "snack",
        tags: ["halal"], description: "Traditional layered cake"
    },
];

const surplusItems = [
    {
        id: 101, name: "Chicken Rice (Surplus)", price: 3.00, originalPrice: 5.50,
        emoji: "🍛", discount: "45% OFF", qty: 5, vendor: "Cafeteria A"
    },
    {
        id: 102, name: "Nasi Lemak (Surplus)", price: 2.50, originalPrice: 4.00,
        emoji: "🥘", discount: "38% OFF", qty: 8, vendor: "Cafeteria A"
    },
    {
        id: 103, name: "Curry Mee (Surplus)", price: 2.80, originalPrice: 4.50,
        emoji: "🍜", discount: "38% OFF", qty: 3, vendor: "Cafeteria B"
    },
    {
        id: 104, name: "Vegetable Fried Rice (Surplus)", price: 2.00, originalPrice: 3.50,
        emoji: "🍚", discount: "43% OFF", qty: 6, vendor: "Cafeteria A"
    },
    {
        id: 105, name: "Mee Goreng (Surplus)", price: 2.50, originalPrice: 4.00,
        emoji: "🍝", discount: "38% OFF", qty: 4, vendor: "Cafeteria A"
    },
    {
        id: 106, name: "Cendol (Surplus)", price: 1.50, originalPrice: 3.00,
        emoji: "🧊", discount: "50% OFF", qty: 10, vendor: "Snack & Drinks"
    },
];

// ===== Cart State =====
let cart = [];

// ===== Render Menu =====
function renderMenu(filter = 'all') {
    const grid = document.getElementById('menuGrid');
    const items = filter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === filter);

    grid.innerHTML = items.map(item => `
        <div class="menu-card">
            <div class="menu-card-img">${item.emoji}</div>
            <div class="menu-card-body">
                <div class="menu-card-header">
                    <span class="menu-card-name">${item.name}</span>
                    <span class="menu-card-price">RM${item.price.toFixed(2)}</span>
                </div>
                <div class="menu-card-vendor">📍 ${item.vendor}</div>
                <div class="menu-card-tags">
                    ${item.tags.includes('halal') ? '<span class="tag tag-halal">🕌 Halal</span>' : ''}
                    ${item.tags.includes('veg') ? '<span class="tag tag-veg">🌱 Veg</span>' : ''}
                    ${item.tags.includes('spicy') ? '<span class="tag tag-spicy">🌶 Spicy</span>' : ''}
                    ${item.tags.includes('popular') ? '<span class="tag tag-popular">🔥 Popular</span>' : ''}
                </div>
                <div class="menu-card-footer">
                    <span class="preorder-badge">⏰ Pre-order available</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        + Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Render Surplus =====
function renderSurplus() {
    const grid = document.getElementById('surplusGrid');
    grid.innerHTML = surplusItems.map(item => `
        <div class="surplus-card">
            <div class="surplus-emoji">${item.emoji}</div>
            <div class="surplus-name">${item.name}</div>
            <div class="surplus-price">
                <span class="surplus-old-price">RM${item.originalPrice.toFixed(2)}</span>
                <span class="surplus-new-price">RM${item.price.toFixed(2)}</span>
                <span class="surplus-discount">${item.discount}</span>
            </div>
            <div class="surplus-qty">Only ${item.qty} left!</div>
            <button class="surplus-btn" onclick="addSurplusToCart(${item.id})">
                Grab Now - RM${item.price.toFixed(2)}
            </button>
        </div>
    `).join('');
}

// ===== Cart Functions =====
function addToCart(id) {
    const item = menuItems.find(m => m.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    showToast(`Added ${item.name} to cart!`);
}

function addSurplusToCart(id) {
    const item = surplusItems.find(m => m.id === id);
    if (item.qty <= 0) {
        showToast("Sorry, this item is sold out!");
        return;
    }
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    item.qty--;
    renderSurplus();
    updateCartUI();
    showToast(`Grabbed ${item.name} at discount!`);
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
}

function updateQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(id);
    }
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((sum, c) => sum + c.qty, 0);
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

    // Floating cart
    const floatingCart = document.getElementById('floatingCart');
    const cartCount = document.getElementById('cartCount');
    if (count > 0) {
        floatingCart.style.display = 'flex';
        cartCount.textContent = count;
    } else {
        floatingCart.style.display = 'none';
    }

    // Cart modal
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const totalPrice = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div style="font-size:3rem;">🍽️</div>
                <p>Your cart is empty</p>
                <small>Add some delicious meals from the menu!</small>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        cartSummary.style.display = 'block';
        totalPrice.textContent = `RM${(total + 0.50).toFixed(2)}`;
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-emoji">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">RM${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('') + `
            <div style="padding:10px 0;color:var(--text-light);font-size:0.85rem;">
                + RM0.50 service fee
            </div>
        `;
    }
}

// ===== Filter & Search =====
function filterMenu(category, btn) {
    document.querySelectorAll('.vendor-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(category);
}

function selectTimeSlot(btn) {
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    showToast(`Pickup time set to ${btn.textContent}`);
}

// ===== Modal Functions =====
function showLogin() { document.getElementById('loginModal').classList.add('active'); }
function showRegister() { document.getElementById('registerModal').classList.add('active'); }
function showCart() { document.getElementById('cartModal').classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function handleLogin() {
    closeModal('loginModal');
    showToast("Welcome back! You're now logged in.");
}

function handleRegister() {
    closeModal('registerModal');
    showToast("Account created successfully! Welcome to CampusBite!");
}

function handleCheckout() {
    closeModal('cartModal');
    showToast("Order placed successfully! Your pickup code is #CB" + Math.floor(1000 + Math.random() * 9000));
    cart = [];
    updateCartUI();
}

// ===== Toast =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// ===== Scroll & Nav =====
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const actions = document.querySelector('.nav-actions');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    actions.style.display = actions.style.display === 'flex' ? 'none' : 'flex';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// ===== Init =====
renderMenu();
renderSurplus();
