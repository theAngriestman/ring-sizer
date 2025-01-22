class RingSizeTool {
    constructor(container) {
        this.container = container;

        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --card-width: 300px;
                --card-height: 189px;
                --card-radius: 16px;
                --card-bg: linear-gradient(135deg, #e6e6e6, #cccccc);
                --font-base-size: 16px;
                --font-scale: 1;
                --ring-base-size: 50px;
            }

            .card-frame {
                width: var(--card-width);
                height: var(--card-height);
                border-radius: var(--card-radius);
                background: var(--card-bg);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: calc(var(--font-base-size) * var(--font-scale));
                color: #333;
                transform-origin: left center;
                border: 2px solid #000;
            }

            .card-frame .card-number {
                position: absolute;
                top: 40%;
                left: 10%;
                font-size: 1rem;
                color: #555;
                font-family: 'Courier New', monospace;
                letter-spacing: 2px;
            }

            .card-frame .card-expiry {
                position: absolute;
                bottom: 15%;
                left: 10%;
                font-size: 0.8rem;
                color: #555;
                font-family: 'Courier New', monospace;
            }

            .ring-frame {
                width: var(--ring-base-size);
                height: var(--ring-base-size);
                border: 2px solid #000;
                border-radius: 50%;
                display: none;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: bold;
                color: #333;
                background-color: #f0f0f0;
            }

            .controls {
                position: absolute;
                bottom: 20px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: white;
                padding: 5px 10px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .controls-row {
                display: flex;
                justify-content: space-around;
                width: 100%;
            }

            button {
                padding: 8px 15px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: white;
                font-size: 14px;
                cursor: pointer;
            }

            button:disabled {
                background-color: #aaa;
                cursor: not-allowed;
            }

            input[type="range"] {
                width: 100%;
                margin: 5px 0;
            }
        `;
        document.head.appendChild(style);

        // Create elements
        this.card = document.createElement('div');
        this.card.classList.add('card-frame');

        this.cardNumber = document.createElement('div');
        this.cardNumber.classList.add('card-number');
        this.cardNumber.textContent = '1234 5678 9012 3456';
        this.card.appendChild(this.cardNumber);

        this.cardExpiry = document.createElement('div');
        this.cardExpiry.classList.add('card-expiry');
        this.cardExpiry.textContent = '01/25';
        this.card.appendChild(this.cardExpiry);

        this.ring = document.createElement('div');
        this.ring.classList.add('ring-frame');
        this.ring.textContent = '15';
        this.ring.style.display = 'none';

        this.controls = document.createElement('div');
        this.controls.classList.add('controls');

        this.scalerLabel = document.createElement('label');
        this.scalerLabel.textContent = 'Масштабування';
        this.controls.appendChild(this.scalerLabel);

        this.scaler = document.createElement('input');
        this.scaler.type = 'range';
        this.scaler.min = '1';
        this.scaler.max = '3';
        this.scaler.step = '0.01';
        this.scaler.value = '1';
        this.controls.appendChild(this.scaler);

        this.controlsRow = document.createElement('div');
        this.controlsRow.classList.add('controls-row');

        this.confirmCard = document.createElement('button');
        this.confirmCard.textContent = 'Підтвердити';
        this.controlsRow.appendChild(this.confirmCard);

        this.confirmRing = document.createElement('button');
        this.confirmRing.textContent = 'Підтвердити розмір кільця';
        this.confirmRing.disabled = true;
        this.controlsRow.appendChild(this.confirmRing);

        this.controls.appendChild(this.controlsRow);

        // Append elements to the container
        this.container.appendChild(this.card);
        this.container.appendChild(this.ring);
        this.container.appendChild(this.controls);

        // Variables
        this.isCardStep = true;
        this.cardScale = 1;
        this.ringScale = 1;

        // Bind events
        this.scaler.addEventListener('input', this.handleScaleChange.bind(this));
        this.confirmCard.addEventListener('click', this.handleCardConfirm.bind(this));
        this.confirmRing.addEventListener('click', this.handleRingConfirm.bind(this));
    }

    handleScaleChange(event) {
        const scaleValue = parseFloat(event.target.value);
        this.container.style.setProperty('--font-scale', scaleValue);

        if (this.isCardStep) {
            this.card.style.transform = `scale(${scaleValue}) translateX(calc((1 - ${scaleValue}) * 50%))`;
            this.cardScale = scaleValue;
        } else {
            const ringSize = (scaleValue / this.cardScale) * 15;
            this.ring.style.transform = `scale(${scaleValue})`;
            this.ring.textContent = ringSize.toFixed(1);
            this.ringScale = scaleValue;
        }
    }

    handleCardConfirm() {
        this.isCardStep = false;
        this.card.style.display = 'none';
        this.ring.style.display = 'flex';
        this.scaler.value = this.ringScale;
        this.confirmCard.disabled = true;
        this.confirmRing.disabled = false;
    }

    handleRingConfirm() {
        const finalRingSize = (this.ringScale / this.cardScale) * 15;
        alert(`Розмір вашого кільця: ${finalRingSize.toFixed(1)}`);
    }
}
