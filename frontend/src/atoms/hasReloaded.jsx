import { atom } from 'recoil';

export const EnteredChat = atom({
    key: 'enteredAtom',
    default: JSON.parse(localStorage.getItem('hasEntered')) || false, // Parse the value since it's stored as a string in localStorage
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                localStorage.setItem('hasEntered', JSON.stringify(value)); // Stringify the value before storing it
            });
        },
    ],
});
