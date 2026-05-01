const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const itemInput = document.getElementById('newItem');
const addItemButton = document.getElementById('addItem');
const itemList = document.getElementById('itemList');
const listStatus = document.getElementById('listStatus');
const themeToggle = document.getElementById('themeToggle');

const initialItems = ['Learn JavaScript', 'Build UI', 'Add validation'];

function renderItems(items) {
    itemList.innerHTML = '';

    if (items.length === 0) {
        listStatus.textContent = 'The list is currently empty. Add your first item!';
        return;
    }

    listStatus.textContent = `You have ${items.length} item${items.length === 1 ? '' : 's'} in the list.`;

    items.forEach((text, index) => {
        const listItem = document.createElement('li');
        const name = document.createElement('span');
        name.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger';
        removeButton.type = 'button';
        removeButton.addEventListener('click', () => removeItem(index));

        listItem.appendChild(name);
        listItem.appendChild(removeButton);
        itemList.appendChild(listItem);
    });
}

let items = [...initialItems];
renderItems(items);

function removeItem(index) {
    items = items.filter((_, i) => i !== index);
    renderItems(items);
}

function showFeedback(message, type = 'success') {
    feedback.textContent = message;
    feedback.style.color = type === 'success' ? 'var(--success)' : 'var(--danger)';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
        showFeedback('Please enter a valid name with at least 2 characters.', 'error');
        return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
    }

    if (message.length < 10) {
        showFeedback('Your message should be at least 10 characters long.', 'error');
        return;
    }

    showFeedback(`Thanks, ${name}! Your message has been received.`, 'success');
    form.reset();
});

addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText.length === 0) {
        listStatus.textContent = 'Please enter an item name before adding.';
        listStatus.style.color = 'var(--danger)';
        return;
    }

    items.push(itemText);
    itemInput.value = '';
    listStatus.style.color = '';
    renderItems(items);
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? 'Light Theme' : 'Dark Theme';
});
