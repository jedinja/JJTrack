class UrbanTableMod {
	constructor(
		targetComponent,
		targetSelector,
		classNames,
		onClick,
		formatter,
		renderer,
		mouseEventsHandler = {
			mouseEnter : null,
			mouseLeave : null,
		}
	) {
		this.target = targetComponent;
		this.selector = targetSelector;
		this.transform = {
			classNames: Array.isArray(classNames) ? classNames : [classNames],
			onClick,
			formatter,
            renderer,
            mouseEventsHandler
		}
	}
}

export default UrbanTableMod;