import sys
import random

try:
    import pytest
    HAS_PYTEST = True
except ImportError:
    HAS_PYTEST = False
    import unittest

# Import the module under test
from quote import random_quote, QUOTES


def test_returns_nonempty_string():
    result = random_quote()
    assert isinstance(result, str)
    assert len(result) > 0


def test_result_in_quotes_list():
    result = random_quote()
    assert result in QUOTES


def test_deterministic_with_seed():
    random.seed(99)
    first = random_quote()
    random.seed(99)
    second = random_quote()
    assert first == second


def test_different_seeds_may_differ():
    # Not guaranteed, but with 6 quotes and seeds 1 vs 2 they should differ
    random.seed(1)
    a = random_quote()
    random.seed(2)
    b = random_quote()
    # Just assert both are valid strings in QUOTES
    assert a in QUOTES
    assert b in QUOTES


if __name__ == '__main__':
    if HAS_PYTEST:
        sys.exit(pytest.main([__file__, '-v']))
    else:
        unittest.main()
