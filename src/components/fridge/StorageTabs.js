export default function StorageTabs({ selectedStorage, onChange }) {
    const tabs = [
        { value: "all", label: "전체보기" },
        { value: "refrigerator", label: "냉장실" },
        { value: "freezer", label: "냉동실" },
        { value: "room", label: "실온" },
    ];

    return (
        <div className="storage-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    type="button"
                    className={`storage-tab ${selectedStorage === tab.value ? "active" : ""}`}
                    onClick={() => onChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
