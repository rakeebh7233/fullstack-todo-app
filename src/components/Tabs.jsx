export function Tabs(props) {
    const { todos, selectedTab, setSelectedTab } = props;

    const tabs = ["All", "Active", "Completed"];

    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {
                const numOfTasks = tab === "All" ? 
                    todos.length : 
                    tab === "Active" ?
                        todos.filter(todo => !todo.complete)
                        .length :
                        todos.filter(todo => todo.complete).length
                return (
                    <button onClick={()=>{
                        setSelectedTab(tab);
                    }} key={tabIndex} className={"tab-button "
                        + (tab===selectedTab ? "tab-selected" : "")}>
                        <h4>{tab}<span> ({numOfTasks})</span></h4>
                    </button>
                )    
            })}
            <hr />
        </nav>
    );
}