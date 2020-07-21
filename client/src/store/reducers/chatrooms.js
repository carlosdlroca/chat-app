import {
    GET_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
} from "../actionTypes";

export default function chatroomReducer(state = [], action) {
    switch (action.type) {
        case GET_CHATROOMS:
            const { chatrooms } = action.chatrooms;
            return [...state, ...chatrooms];
        case CREATE_CHATROOM:
            return [...state, action.chatroom];
        case DELETE_CHATROOM:
            return state.filter(
                (chatroom) => chatroom.id !== action.chatroom_id
            );
        default:
            return state;
    }
}
