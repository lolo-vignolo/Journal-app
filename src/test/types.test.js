import { types } from "../types/types"

describe('testing types', () => {




    test(' the object should match with the snapshoot ', () => {

        const mytypes = {

            /* authreducer */
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            /*uiReducer*/
            uiSetError: "[UI] Set Error",
            uiRemoveError: "[UI] Remove Error",
        
            /**/
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            /* Work with notes - Sidebar */
        
            noteAddNew : '[Note] New Note',
            noteActive : '[Note] Set active note',
            noteLoad: '[Note] Load Note',
            noteUpDated: '[Note] Note updated',
            noteFileUrl: '[Note] Updated image url',
            noteDelete: '[Note] Delete note',
            noteLogoutCleaning: '[Note] Logout cleaning',
        
        
        }

        expect(types).toEqual(mytypes)

    })
    
    
})
