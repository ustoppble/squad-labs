import argparse
import random

QUOTES = [
    "A jornada de mil milhas começa com um único passo.",
    "Acredite em você mesmo e tudo será possível.",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Não desista. O começo é sempre o mais difícil.",
    "Cada dia é uma nova oportunidade de ser melhor.",
    "Grandes conquistas exigem grandes coragens.",
]


def random_quote():
    return random.choice(QUOTES)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Frase motivacional aleatória")
    parser.add_argument("--seed", type=int, help="Semente para saída determinística")
    args = parser.parse_args()
    if args.seed is not None:
        random.seed(args.seed)
    print(random_quote())
