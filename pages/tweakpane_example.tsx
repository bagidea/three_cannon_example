import { Flex } from "@chakra-ui/react"
import { MutableRefObject, useEffect, useRef } from "react"
import { FolderApi, Pane, TabApi } from "tweakpane"

const TweakpaneExample = () => {
    const testContainer: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const PARAMS = {
            name: "Hello World",
            speed: 50,
            quality: 0,
            isMesh: true,
            color1: { r: 150, g: 150, b: 255 },
            color2: { r: 220, g: 100, b: 150, a: 255 },
            point: { x: 50, y: 50 },
            vector3: { x: 0, y: 0, z: 0 },
            vector4: { x: 0, y: 0, z: 0, w: 0 }
        }

        const pane: Pane = new Pane({
            title: "Tweakpane Example",
            container: testContainer.current
        })
        //console.log(pane)
        
        const tab: TabApi = pane.addTab({
            pages: [
                { title: "tab1" },
                { title: "tab2" }
            ]
        })

        const f1: FolderApi = tab.pages[0].addFolder({
            title: "Example1",
            expanded: false
        })

        f1.addInput(PARAMS, 'name')
        f1.addInput(PARAMS, 'speed')
        f1.addInput(PARAMS, 'speed', {
            label: "speed advance",
            format: v => v.toFixed(6)
        })
        f1.addInput(PARAMS, 'speed', {
            label: "slider",
            step: 5,
            min: 0,
            max: 100
        })
        f1.addInput(PARAMS, 'quality', {
            options: {
                low: 0,
                medium: 50,
                high: 100
            }
        })
        f1.addInput(PARAMS, 'isMesh')
        f1.addInput(PARAMS, 'color1', {
            alpha: false
        })
        f1.addInput(PARAMS, 'color2')
        f1.addInput(PARAMS, 'color1', {
            picker: 'inline',
            expanded: true
        })
        f1.addInput(PARAMS, 'point', {
            x: { step: 1, min: -100, max: 100 },
            y: { step: 1, min: -100, max: 100, inverted: true }
        })
        f1.addInput(PARAMS, 'point', {
            picker: 'inline',
            expanded: true
        })
        f1.addInput(PARAMS, 'vector3')
        f1.addInput(PARAMS, 'vector4', {
            x: { min: 0, max: 1 },
            y: { min: 0, max: 1 },
            z: { min: 0, max: 1 },
            w: { min: 0, max: 1 }
        })
        f1.addButton({
            title: "Test Button",
            label: "Button"
        }).on('click', () => {
            f1.title = "Example1 : OK Clicked"
        })

        tab.pages[1].addMonitor(PARAMS, 'name')
        tab.pages[1].addButton({ title: "Previous" })
        tab.pages[1].addButton({ title: "Next" })
        tab.pages[1].addButton({ title: "Reset" })

        tab.pages[1].addBlade({
            view: 'text',
            label: "username",
            parse: v => String(v),
            value: "BagIdea"
        })
        tab.pages[1].addBlade({
            view: 'list',
            label: "testList",
            options: [
                { text: "test1", value: "abc" },
                { text: "test2", value: "def" },
                { text: "test3", value: "ghi" }
            ],
            value: "abc"
        })
        tab.pages[1].addBlade({
            view: 'slider',
            label: 'slider',
            min: -100,
            max: 100,
            value: 0
        })
    }, [])

    return (
        <>
            <style jsx global>{`
                :root {
                    --tp-base-background-color: hsla(0, 0%, 10%, 0.8);
                    --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                    --tp-button-background-color: hsla(0, 0%, 80%, 1);
                    --tp-button-background-color-active: hsla(0, 0%, 100%, 1);
                    --tp-button-background-color-focus: hsla(0, 0%, 95%, 1);
                    --tp-button-background-color-hover: hsla(0, 0%, 85%, 1);
                    --tp-button-foreground-color: hsla(0, 0%, 0%, 0.8);
                    --tp-container-background-color: hsla(0, 0%, 0%, 0.3);
                    --tp-container-background-color-active: hsla(0, 0%, 0%, 0.6);
                    --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.5);
                    --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.4);
                    --tp-container-foreground-color: hsla(0, 0%, 100%, 0.5);
                    --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.2);
                    --tp-input-background-color: hsla(0, 0%, 0%, 0.3);
                    --tp-input-background-color-active: hsla(0, 0%, 0%, 0.6);
                    --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.5);
                    --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.4);
                    --tp-input-foreground-color: hsla(0, 0%, 100%, 0.5);
                    --tp-label-foreground-color: hsla(0, 0%, 100%, 0.5);
                    --tp-monitor-background-color: hsla(0, 0%, 0%, 0.3);
                    --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.3);
                }

                .testContainer .tp-rotv {
                    width: 370px;
                    height: 100vh;
                    border-radius: 0px;
                    font-size: 14px;
                }

                .testContainer .tp-lblv_v {
                    width: 180px;
                }
            `}</style>

            <Flex className="testContainer" ref={ testContainer } />
        </>
    )
}

export default TweakpaneExample