import { ADD_CATEGORY } from "../../utils/urls";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addCategory, setIsCategoryAddedSuccess } from "../../reducers/CategorySlice";

export default function AddNewCategory() {
    const [newCategory, setNewCategory] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);


    const addNewCategory = async () => {
        if (newCategory !== '') {

            const headers = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
            await axios.post(ADD_CATEGORY,
                {
                    categoryName: newCategory,
                }
                , { headers: headers })
                .then(function (response) {
                    if (response?.data?.statusCode === 200) {
                        dispatch(addCategory(response?.data?.data));
                        dispatch(setIsCategoryAddedSuccess(true));
                        setNewCategory('');
                    }

                })
                .catch(function (error) {
                    console.log("Product saving error-- " + error);
                });
        } else {

        }
    }

    return (
        <div>
            <div className="p-4 border rounded-lg">
                <h2 className="text-base font-bold leading-7 text-gray-900">Add New Category</h2>

                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4">
                    {/* <div className="mt-2 flex flex-row gap-4"> */}
                    <input
                        type="text"
                        name="new_cat"
                        id="new_cat"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        autoComplete="given-name"

                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                        type="button"
                        className="rounded-md bg-[#d5e8d4] outline-[#aecfa0] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        onClick={addNewCategory}
                    >
                        Add
                    </button>
                    {/* </div> */}
                </div>





            </div>
        </div >
    );
}