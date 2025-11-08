import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "@/components/sortableItem";

const MoveSection = ({ sections, onClose, onSave }) => {
    const [localSections, setLocalSections] = useState(sections);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setLocalSections((items) => {
                const oldIndex = items.findIndex((s) => s.id === active.id);
                const newIndex = items.findIndex((s) => s.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSave = async () => {
        const orderedSections = localSections.map((section, index) => ({
            id: section.id,
            order: index + 1,
        }));
        await onSave(orderedSections);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Reorder Sections</h2>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={localSections.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {localSections.map((section) => (
                            <SortableItem key={section.id} id={section.id}>
                                <div className="p-3 bg-gray-100 rounded-md mb-2 cursor-grab hover:bg-gray-200">
                                    {section.title || "Untitled Section"}
                                </div>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>

                <div className="flex justify-end mt-4 gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoveSection;
