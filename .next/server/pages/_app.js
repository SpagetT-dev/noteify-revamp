/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./contexts/AuthContext.js":
/*!*********************************!*\
  !*** ./contexts/AuthContext.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/firebase */ \"(pages-dir-node)/./lib/firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(pages-dir-node)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__]);\n([_lib_firebase__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth auto */ \n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth, {\n                \"AuthProvider.useEffect.unsubscribe\": (user)=>{\n                    console.log('Auth state changed:', user ? {\n                        uid: user.uid,\n                        emailVerified: user.emailVerified\n                    } : 'No user');\n                    setUser(user);\n                    setLoading(false);\n                }\n            }[\"AuthProvider.useEffect.unsubscribe\"]);\n            return ({\n                \"AuthProvider.useEffect\": ()=>unsubscribe()\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const login = async (email, password)=>{\n        try {\n            console.log('Calling signInWithEmailAndPassword:', {\n                email\n            });\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signInWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            if (!userCredential.user.emailVerified) {\n                throw new Error('Please verify your email before logging in.');\n            }\n            router.push('/notes');\n        } catch (error) {\n            console.error('Login error:', error.message);\n            throw error;\n        }\n    };\n    const signup = async (email, password, displayName)=>{\n        try {\n            console.log('Calling createUserWithEmailAndPassword:', {\n                email,\n                displayName\n            });\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.createUserWithEmailAndPassword)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.updateProfile)(userCredential.user, {\n                displayName\n            });\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.sendEmailVerification)(userCredential.user);\n            console.log('Verification email sent to:', email);\n        } catch (error) {\n            console.error('Signup error:', error.message);\n            throw error;\n        }\n    };\n    const resendVerificationEmail = async ()=>{\n        try {\n            if (_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser) {\n                await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.sendEmailVerification)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser);\n                console.log('Verification email resent to:', _lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser.email);\n            } else {\n                throw new Error('No user is signed in.');\n            }\n        } catch (error) {\n            console.error('Resend verification error:', error.message);\n            throw error;\n        }\n    };\n    const logout = async ()=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signOut)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth);\n            router.push('/login');\n        } catch (error) {\n            console.error('Logout error:', error.message);\n            throw error;\n        }\n    };\n    const updateUserProfile = async (displayName)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.updateProfile)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser, {\n                displayName\n            });\n            setUser({\n                ..._lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser\n            });\n        } catch (error) {\n            console.error('Update profile error:', error.message);\n            throw error;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            login,\n            signup,\n            logout,\n            updateUserProfile,\n            resendVerificationEmail\n        },\n        children: !loading && children\n    }, void 0, false, {\n        fileName: \"/workspaces/noteify/contexts/AuthContext.js\",\n        lineNumber: 86,\n        columnNumber: 5\n    }, undefined);\n};\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHRzL0F1dGhDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXVFO0FBQ2hDO0FBQ3VIO0FBQ2xIO0FBRTVDLE1BQU1ZLDRCQUFjWixvREFBYUEsQ0FBQyxDQUFDO0FBRTVCLE1BQU1hLGVBQWUsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDdkMsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdiLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ2MsU0FBU0MsV0FBVyxHQUFHZiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNZ0IsU0FBU1IsMERBQVNBO0lBRXhCVCxnREFBU0E7a0NBQUM7WUFDUixNQUFNa0IsY0FBY2YsaUVBQWtCQSxDQUFDRCwrQ0FBSUE7c0RBQUUsQ0FBQ1c7b0JBQzVDTSxRQUFRQyxHQUFHLENBQUMsdUJBQXVCUCxPQUFPO3dCQUFFUSxLQUFLUixLQUFLUSxHQUFHO3dCQUFFQyxlQUFlVCxLQUFLUyxhQUFhO29CQUFDLElBQUk7b0JBQ2pHUixRQUFRRDtvQkFDUkcsV0FBVztnQkFDYjs7WUFDQTswQ0FBTyxJQUFNRTs7UUFDZjtpQ0FBRyxFQUFFO0lBRUwsTUFBTUssUUFBUSxPQUFPQyxPQUFPQztRQUMxQixJQUFJO1lBQ0ZOLFFBQVFDLEdBQUcsQ0FBQyx1Q0FBdUM7Z0JBQUVJO1lBQU07WUFDM0QsTUFBTUUsaUJBQWlCLE1BQU10Qix5RUFBMEJBLENBQUNGLCtDQUFJQSxFQUFFc0IsT0FBT0M7WUFDckUsSUFBSSxDQUFDQyxlQUFlYixJQUFJLENBQUNTLGFBQWEsRUFBRTtnQkFDdEMsTUFBTSxJQUFJSyxNQUFNO1lBQ2xCO1lBQ0FWLE9BQU9XLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT0MsT0FBTztZQUNkVixRQUFRVSxLQUFLLENBQUMsZ0JBQWdCQSxNQUFNQyxPQUFPO1lBQzNDLE1BQU1EO1FBQ1I7SUFDRjtJQUVBLE1BQU1FLFNBQVMsT0FBT1AsT0FBT0MsVUFBVU87UUFDckMsSUFBSTtZQUNGYixRQUFRQyxHQUFHLENBQUMsMkNBQTJDO2dCQUFFSTtnQkFBT1E7WUFBWTtZQUM1RSxNQUFNTixpQkFBaUIsTUFBTXJCLDZFQUE4QkEsQ0FBQ0gsK0NBQUlBLEVBQUVzQixPQUFPQztZQUN6RSxNQUFNbEIsNERBQWFBLENBQUNtQixlQUFlYixJQUFJLEVBQUU7Z0JBQUVtQjtZQUFZO1lBQ3ZELE1BQU14QixvRUFBcUJBLENBQUNrQixlQUFlYixJQUFJO1lBQy9DTSxRQUFRQyxHQUFHLENBQUMsK0JBQStCSTtRQUM3QyxFQUFFLE9BQU9LLE9BQU87WUFDZFYsUUFBUVUsS0FBSyxDQUFDLGlCQUFpQkEsTUFBTUMsT0FBTztZQUM1QyxNQUFNRDtRQUNSO0lBQ0Y7SUFFQSxNQUFNSSwwQkFBMEI7UUFDOUIsSUFBSTtZQUNGLElBQUkvQiwrQ0FBSUEsQ0FBQ2dDLFdBQVcsRUFBRTtnQkFDcEIsTUFBTTFCLG9FQUFxQkEsQ0FBQ04sK0NBQUlBLENBQUNnQyxXQUFXO2dCQUM1Q2YsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ2xCLCtDQUFJQSxDQUFDZ0MsV0FBVyxDQUFDVixLQUFLO1lBQ3JFLE9BQU87Z0JBQ0wsTUFBTSxJQUFJRyxNQUFNO1lBQ2xCO1FBQ0YsRUFBRSxPQUFPRSxPQUFPO1lBQ2RWLFFBQVFVLEtBQUssQ0FBQyw4QkFBOEJBLE1BQU1DLE9BQU87WUFDekQsTUFBTUQ7UUFDUjtJQUNGO0lBRUEsTUFBTU0sU0FBUztRQUNiLElBQUk7WUFDRixNQUFNN0Isc0RBQU9BLENBQUNKLCtDQUFJQTtZQUNsQmUsT0FBT1csSUFBSSxDQUFDO1FBQ2QsRUFBRSxPQUFPQyxPQUFPO1lBQ2RWLFFBQVFVLEtBQUssQ0FBQyxpQkFBaUJBLE1BQU1DLE9BQU87WUFDNUMsTUFBTUQ7UUFDUjtJQUNGO0lBRUEsTUFBTU8sb0JBQW9CLE9BQU9KO1FBQy9CLElBQUk7WUFDRixNQUFNekIsNERBQWFBLENBQUNMLCtDQUFJQSxDQUFDZ0MsV0FBVyxFQUFFO2dCQUFFRjtZQUFZO1lBQ3BEbEIsUUFBUTtnQkFBRSxHQUFHWiwrQ0FBSUEsQ0FBQ2dDLFdBQVc7WUFBQztRQUNoQyxFQUFFLE9BQU9MLE9BQU87WUFDZFYsUUFBUVUsS0FBSyxDQUFDLHlCQUF5QkEsTUFBTUMsT0FBTztZQUNwRCxNQUFNRDtRQUNSO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ25CLFlBQVkyQixRQUFRO1FBQUNDLE9BQU87WUFBRXpCO1lBQU1FO1lBQVNRO1lBQU9RO1lBQVFJO1lBQVFDO1lBQW1CSDtRQUF3QjtrQkFDN0csQ0FBQ2xCLFdBQVdIOzs7Ozs7QUFHbkIsRUFBRTtBQUVLLE1BQU0yQixVQUFVO0lBQ3JCLE1BQU1DLFVBQVV6QyxpREFBVUEsQ0FBQ1c7SUFDM0IsSUFBSSxDQUFDOEIsU0FBUztRQUNaLE1BQU0sSUFBSWIsTUFBTTtJQUNsQjtJQUNBLE9BQU9hO0FBQ1QsRUFBRSIsInNvdXJjZXMiOlsiL3dvcmtzcGFjZXMvbm90ZWlmeS9jb250ZXh0cy9BdXRoQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IG9uQXV0aFN0YXRlQ2hhbmdlZCwgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCwgc2lnbk91dCwgdXBkYXRlUHJvZmlsZSwgc2VuZEVtYWlsVmVyaWZpY2F0aW9uIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoIHN0YXRlIGNoYW5nZWQ6JywgdXNlciA/IHsgdWlkOiB1c2VyLnVpZCwgZW1haWxWZXJpZmllZDogdXNlci5lbWFpbFZlcmlmaWVkIH0gOiAnTm8gdXNlcicpO1xuICAgICAgc2V0VXNlcih1c2VyKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9naW4gPSBhc3luYyAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdDYWxsaW5nIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkOicsIHsgZW1haWwgfSk7XG4gICAgICBjb25zdCB1c2VyQ3JlZGVudGlhbCA9IGF3YWl0IHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XG4gICAgICBpZiAoIXVzZXJDcmVkZW50aWFsLnVzZXIuZW1haWxWZXJpZmllZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB2ZXJpZnkgeW91ciBlbWFpbCBiZWZvcmUgbG9nZ2luZyBpbi4nKTtcbiAgICAgIH1cbiAgICAgIHJvdXRlci5wdXNoKCcvbm90ZXMnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2lnbnVwID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCwgZGlzcGxheU5hbWUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ0NhbGxpbmcgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkOicsIHsgZW1haWwsIGRpc3BsYXlOYW1lIH0pO1xuICAgICAgY29uc3QgdXNlckNyZWRlbnRpYWwgPSBhd2FpdCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIGF3YWl0IHVwZGF0ZVByb2ZpbGUodXNlckNyZWRlbnRpYWwudXNlciwgeyBkaXNwbGF5TmFtZSB9KTtcbiAgICAgIGF3YWl0IHNlbmRFbWFpbFZlcmlmaWNhdGlvbih1c2VyQ3JlZGVudGlhbC51c2VyKTtcbiAgICAgIGNvbnNvbGUubG9nKCdWZXJpZmljYXRpb24gZW1haWwgc2VudCB0bzonLCBlbWFpbCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NpZ251cCBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNlbmRWZXJpZmljYXRpb25FbWFpbCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGF1dGguY3VycmVudFVzZXIpIHtcbiAgICAgICAgYXdhaXQgc2VuZEVtYWlsVmVyaWZpY2F0aW9uKGF1dGguY3VycmVudFVzZXIpO1xuICAgICAgICBjb25zb2xlLmxvZygnVmVyaWZpY2F0aW9uIGVtYWlsIHJlc2VudCB0bzonLCBhdXRoLmN1cnJlbnRVc2VyLmVtYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdXNlciBpcyBzaWduZWQgaW4uJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jlc2VuZCB2ZXJpZmljYXRpb24gZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaWduT3V0KGF1dGgpO1xuICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dvdXQgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlVXNlclByb2ZpbGUgPSBhc3luYyAoZGlzcGxheU5hbWUpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlUHJvZmlsZShhdXRoLmN1cnJlbnRVc2VyLCB7IGRpc3BsYXlOYW1lIH0pO1xuICAgICAgc2V0VXNlcih7IC4uLmF1dGguY3VycmVudFVzZXIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VwZGF0ZSBwcm9maWxlIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHVzZXIsIGxvYWRpbmcsIGxvZ2luLCBzaWdudXAsIGxvZ291dCwgdXBkYXRlVXNlclByb2ZpbGUsIHJlc2VuZFZlcmlmaWNhdGlvbkVtYWlsIH19PlxuICAgICAgeyFsb2FkaW5nICYmIGNoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGggbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBdXRoUHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn07Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJhdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwic2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJzaWduT3V0IiwidXBkYXRlUHJvZmlsZSIsInNlbmRFbWFpbFZlcmlmaWNhdGlvbiIsInVzZVJvdXRlciIsIkF1dGhDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwicm91dGVyIiwidW5zdWJzY3JpYmUiLCJjb25zb2xlIiwibG9nIiwidWlkIiwiZW1haWxWZXJpZmllZCIsImxvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsInVzZXJDcmVkZW50aWFsIiwiRXJyb3IiLCJwdXNoIiwiZXJyb3IiLCJtZXNzYWdlIiwic2lnbnVwIiwiZGlzcGxheU5hbWUiLCJyZXNlbmRWZXJpZmljYXRpb25FbWFpbCIsImN1cnJlbnRVc2VyIiwibG9nb3V0IiwidXBkYXRlVXNlclByb2ZpbGUiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCIsImNvbnRleHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./contexts/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyB_uiBaHMVOBoi3tf5rVuK8tnETFU3qfsw\",\n    authDomain: \"noteify-63f51.firebaseapp.com\",\n    projectId: \"noteify-63f51\",\n    storageBucket: \"noteify-63f51.firebasestorage.app\",\n    messagingSenderId: \"767523363771\",\n    appId: \"1:767523363771:web:8f88f445a28f988248429e\"\n};\nconst app = !(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)();\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9maXJlYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE4RDtBQUN0QjtBQUNVO0FBRWxELE1BQU1LLGlCQUFpQjtJQUNyQkMsUUFBUUMseUNBQXdDO0lBQ2hERyxZQUFZSCwrQkFBNEM7SUFDeERLLFdBQVdMLGVBQTJDO0lBQ3RETyxlQUFlUCxtQ0FBK0M7SUFDOURTLG1CQUFtQlQsY0FBb0Q7SUFDdkVXLE9BQU9YLDJDQUF1QztBQUNoRDtBQUVBLE1BQU1hLE1BQU0sQ0FBQ25CLHFEQUFPQSxHQUFHb0IsTUFBTSxHQUFHckIsMkRBQWFBLENBQUNLLGtCQUFrQkgsb0RBQU1BO0FBQy9ELE1BQU1vQixPQUFPbkIsc0RBQU9BLENBQUNpQixLQUFLO0FBQzFCLE1BQU1HLEtBQUtuQixnRUFBWUEsQ0FBQ2dCLEtBQUsiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL25vdGVpZnkvbGliL2ZpcmViYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGdldEFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZLFxuICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTixcbiAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lELFxuICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCxcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXG4gIGFwcElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUFBfSURcbn07XG5cbmNvbnN0IGFwcCA9ICFnZXRBcHBzKCkubGVuZ3RoID8gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZykgOiBnZXRBcHAoKTtcbmV4cG9ydCBjb25zdCBhdXRoID0gZ2V0QXV0aChhcHApO1xuZXhwb3J0IGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7Il0sIm5hbWVzIjpbImluaXRpYWxpemVBcHAiLCJnZXRBcHBzIiwiZ2V0QXBwIiwiZ2V0QXV0aCIsImdldEZpcmVzdG9yZSIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkiLCJhdXRoRG9tYWluIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4iLCJwcm9qZWN0SWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lEIiwic3RvcmFnZUJ1Y2tldCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VUIiwibWVzc2FnaW5nU2VuZGVySWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lEIiwiYXBwSWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUFBfSUQiLCJhcHAiLCJsZW5ndGgiLCJhdXRoIiwiZGIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/firebase.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"(pages-dir-node)/./contexts/AuthContext.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__]);\n_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/workspaces/noteify/pages/_app.js\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/noteify/pages/_app.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUErQjtBQUN3QjtBQUV4QyxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3BELHFCQUNFLDhEQUFDSCwrREFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL25vdGVpZnkvcGFnZXMvX2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9BdXRoUHJvdmlkZXI+XG4gICk7XG59Il0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "../../server/app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../../server/app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();