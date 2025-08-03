#!/usr/bin/env python3
"""
Robot Frameworkテスト実行スクリプト
"""

import subprocess
import sys
import os
from pathlib import Path

def run_robot_tests(test_path=None, tags=None, output_dir=None):
    """
    Robot Frameworkテストを実行する
    
    Args:
        test_path (str): テストファイルまたはディレクトリのパス
        tags (str): 実行するタグ（例: "smoke"）
        output_dir (str): 出力ディレクトリ
    """
    
    # デフォルトのテストパス
    if test_path is None:
        test_path = "tests/"
    
    # デフォルトの出力ディレクトリ
    if output_dir is None:
        output_dir = "results"
    
    # 出力ディレクトリを作成
    Path(output_dir).mkdir(exist_ok=True)
    
    # Robot Frameworkコマンドを構築
    cmd = ["robot"]
    
    # 出力ディレクトリを設定
    cmd.extend(["--outputdir", output_dir])
    
    # タグが指定されている場合は追加
    if tags:
        cmd.extend(["--include", tags])
    
    # テストパスを追加
    cmd.append(test_path)
    
    print(f"実行コマンド: {' '.join(cmd)}")
    
    try:
        # テストを実行
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print("テストが正常に完了しました")
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"テスト実行中にエラーが発生しました: {e}")
        print(f"エラー出力: {e.stderr}")
        return False

def main():
    """メイン関数"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Robot Frameworkテストを実行します")
    parser.add_argument("--test-path", default="tests/", help="テストファイルまたはディレクトリのパス")
    parser.add_argument("--tags", help="実行するタグ（例: smoke）")
    parser.add_argument("--output-dir", default="results", help="出力ディレクトリ")
    
    args = parser.parse_args()
    
    success = run_robot_tests(
        test_path=args.test_path,
        tags=args.tags,
        output_dir=args.output_dir
    )
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 