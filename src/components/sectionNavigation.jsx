import React from "react";
import {FiChevronsDown, FiChevronsUp} from "react-icons/fi";

const SectionNavigation = ({sections, currentSectionId, onNavigate}) => {
    const currentIndex = sections.findIndex(s => s.id === currentSectionId);

    const getTargetSection = (targetIndex) => {
        if (targetIndex < 0) return "first";
        if (targetIndex >= sections.length) return "last";
        return sections[targetIndex].id;
    }
    const handleNavigation = (direction) => {
        if (!onNavigate) return;

        let targetSection;
        if (direction === "prev") {
            targetSection = getTargetSection(currentIndex - 1);
        } else if (direction === "next") {
            targetSection = getTargetSection(currentIndex + 1);
        }
        onNavigate(targetSection);
    }
    return (
        <div id="section-navigation" className="p-4 my-3 bg-white rounded-lg flex justify-center items-center gap-4">
            <p className="font-semibold text-gray-600">After section {currentIndex + 1}</p>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleNavigation("prev")}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiChevronsUp/>
                    Go to Previous Section
                </button>

                <button
                    onClick={() => handleNavigation("next")}
                    disabled={currentIndex === sections.length - 1}
                    className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Go to Next Section
                    <FiChevronsDown/>
                </button>
            </div>
        </div>
    );
};

export default SectionNavigation;