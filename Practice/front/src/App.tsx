import { useEffect, useRef, useState } from 'react'
import classes from './styles/main.module.scss'
import { motion, useAnimationControls } from 'framer-motion'

const App = () => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })
    const control = useAnimationControls()
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        control
            .start({
                x: coordinates.x,
                y: coordinates.y,
            })
            .then(() => {
                console.log(coordinates)
            })
    }, [coordinates.x, coordinates.y])

    return (
        <div className={classes.main} ref={container}>
            <div className={classes.container}>
                <button
                    onClick={() =>
                        setCoordinates((prev) => ({ ...prev, x: prev.x - 150 }))
                    }
                >
                    left
                </button>
                <button
                    onClick={() =>
                        setCoordinates((prev) => ({ ...prev, x: prev.x + 150 }))
                    }
                >
                    right
                </button>
                <button
                    onClick={() =>
                        setCoordinates((prev) => ({ ...prev, y: prev.y - 150 }))
                    }
                >
                    up
                </button>
                <button
                    onClick={() =>
                        setCoordinates((prev) => ({ ...prev, y: prev.y + 150 }))
                    }
                >
                    down
                </button>
            </div>
            <motion.div
                drag
                animate={control}
                dragConstraints={container}
                transition={{ type: 'tween', duration: 1 }}
                whileDrag={{ scale: 2 }}
            ></motion.div>
        </div>
    )
}
export default App
